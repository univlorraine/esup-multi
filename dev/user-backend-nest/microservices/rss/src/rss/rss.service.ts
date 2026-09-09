/*
 * Copyright ou © ou Copr. Université de Lorraine, (2022)
 *
 * Direction du Numérique de l'Université de Lorraine - SIED
 *  (dn-mobile-dev@univ-lorraine.fr)
 * JNESIS (contact@jnesis.com)
 *
 * Ce logiciel est un programme informatique servant à rendre accessible
 * sur mobile divers services universitaires aux étudiants et aux personnels
 * de l'université.
 *
 * Ce logiciel est régi par la licence CeCILL 2.1, soumise au droit français
 * et respectant les principes de diffusion des logiciels libres. Vous pouvez
 * utiliser, modifier et/ou redistribuer ce programme sous les conditions
 * de la licence CeCILL telle que diffusée par le CEA, le CNRS et INRIA
 * sur le site "http://cecill.info".
 *
 * En contrepartie de l'accessibilité au code source et des droits de copie,
 * de modification et de redistribution accordés par cette licence, il n'est
 * offert aux utilisateurs qu'une garantie limitée. Pour les mêmes raisons,
 * seule une responsabilité restreinte pèse sur l'auteur du programme, le
 * titulaire des droits patrimoniaux et les concédants successifs.
 *
 * À cet égard, l'attention de l'utilisateur est attirée sur les risques
 * associés au chargement, à l'utilisation, à la modification et/ou au
 * développement et à la reproduction du logiciel par l'utilisateur étant
 * donné sa spécificité de logiciel libre, qui peut le rendre complexe à
 * manipuler et qui le réserve donc à des développeurs et des professionnels
 * avertis possédant des connaissances informatiques approfondies. Les
 * utilisateurs sont donc invités à charger et à tester l'adéquation du
 * logiciel à leurs besoins dans des conditions permettant d'assurer la
 * sécurité de leurs systèmes et/ou de leurs données et, plus généralement,
 * à l'utiliser et à l'exploiter dans les mêmes conditions de sécurité.
 *
 * Le fait que vous puissiez accéder à cet en-tête signifie que vous avez
 * pris connaissance de la licence CeCILL 2.1, et que vous en avez accepté les
 * termes.
 */

import { HttpService } from '@nestjs/axios';
import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { RpcException } from '@nestjs/microservices';
import { decode } from 'html-entities';
import * as Parser from 'rss-parser';
import {
  catchError,
  finalize,
  from,
  map,
  Observable,
  of,
  retry,
  shareReplay,
  switchMap,
  tap,
  throwError,
  timer,
} from 'rxjs';
import { FeedOptions } from '../config/configuration.interface';
import { FeedItem } from './feed-item.dto';
import { striptags } from 'striptags';

interface CachedFeed {
  items: FeedItem[];
  fetchedAt: number;
}

@Injectable()
export class RssService {
  private readonly logger = new Logger(RssService.name);
  private readonly feed: FeedOptions;
  private readonly cacheTtlMs: number;
  private readonly allowedHtmlTags: Set<string>;
  private readonly rssParser = new Parser();
  private cached: CachedFeed = null;
  private inFlight: Observable<FeedItem[]> = null;

  constructor(
    private readonly configService: ConfigService,
    private readonly httpService: HttpService,
  ) {
    this.feed = this.configService.get<FeedOptions>('feed');
    this.cacheTtlMs = this.configService.get<number>('cacheTtl');
    this.allowedHtmlTags = new Set(
      this.configService.get<Array<string>>('allowedHtmlTags'),
    );

    if (!this.feed.url) {
      this.logger.error('RSS_SERVICE_FEED_URL is not set, feed is unavailable');
    }
    this.logger.log(
      `Feed url: ${this.feed.url}, timeout: ${this.feed.timeoutMs}ms, ` +
        `retries: ${this.feed.retryCount}, user-agent: ${this.feed.userAgent}`,
    );
    this.logger.log(
      `Cache ttl: ${
        this.cacheTtlMs > 0 ? `${this.cacheTtlMs}ms` : 'disabled'
      }, stale fallback: ${
        this.feed.staleMaxAgeMs > 0
          ? `${this.feed.staleMaxAgeMs}ms`
          : 'disabled'
      }`,
    );
  }

  /**
   * Sert le flux en cache tant qu'il est valable, sinon requête l'url du flux.
   * Les appels concurrents partagent la même requête sortante :
   * sans cela, une rafale d'appels pendant que le flux est lent ou en panne
   * déclenche autant de requêtes simultanées vers le serveur de flux.
   */
  public getRssFeed(): Observable<FeedItem[]> {
    if (this.isFresh()) {
      return of(this.cached.items);
    }
    if (this.inFlight) {
      return this.inFlight;
    }

    let completed = false;
    const request = this.buildFeedRequest().pipe(
      finalize(() => {
        completed = true;
        if (this.inFlight === request) {
          this.inFlight = null;
        }
      }),
      shareReplay({ bufferSize: 1, refCount: false }),
    );
    this.inFlight = completed ? null : request;

    return request;
  }

  /** Détermine si le flux en cache est encore valable. ttl = 0 désactive le cache. */
  private isFresh(): boolean {
    if (!this.cached || this.cacheTtlMs <= 0) {
      return false;
    }
    return Date.now() - this.cached.fetchedAt < this.cacheTtlMs;
  }

  private buildFeedRequest(): Observable<FeedItem[]> {
    const startedAt = Date.now();

    return this.fetchFeed().pipe(
      switchMap((xml) => from(this.rssParser.parseString(xml))),
      map((feed: Parser.Output<FeedItem>) => this.toFeedItems(feed)),
      tap((items) => {
        this.cached = { items, fetchedAt: Date.now() };
        this.logger.log(
          `Got ${items.length} item(s) from feed in ${
            Date.now() - startedAt
          }ms`,
        );
      }),
      catchError((err: any) => this.handleFailure(err, startedAt)),
    );
  }

  private fetchFeed(): Observable<string> {
    return this.httpService
      .get<string>(this.feed.url, {
        timeout: this.feed.timeoutMs,
        responseType: 'text',
        // Sans cela axios tente un JSON.parse sur le xml reçu.
        transformResponse: [(data) => data],
        headers: {
          'User-Agent': this.feed.userAgent,
          Accept:
            'application/rss+xml, application/xml;q=0.9, text/xml;q=0.8, */*;q=0.5',
        },
      })
      .pipe(
        map((response) => response.data),
        retry({
          count: this.feed.retryCount,
          delay: (err, retryIndex) => {
            this.logger.warn(
              `Feed request failed (attempt ${retryIndex}/${
                this.feed.retryCount
              }), retrying in ${this.feed.retryDelayMs}ms: ${this.describeError(
                err,
              )}`,
            );
            return timer(this.feed.retryDelayMs);
          },
        }),
      );
  }

  private toFeedItems(feed: Parser.Output<FeedItem>): FeedItem[] {
    return (feed.items || []).map((item: any) => ({
      ...item,
      title: item.title ? decode(item.title) : '',
      content: item.content
        ? striptags(item.content, { allowedTags: this.allowedHtmlTags })
        : '',
    }));
  }

  /**
   * En cas d'échec, sert le dernier flux valide connu s'il n'est pas trop ancien
   */
  private handleFailure(err: any, startedAt: number): Observable<FeedItem[]> {
    this.logger.error(
      `Unable to get Rss Feed from ${this.feed.url} after ${
        Date.now() - startedAt
      }ms: ${this.describeError(err)}`,
      err?.stack,
    );

    const staleAge = this.cached ? Date.now() - this.cached.fetchedAt : null;
    if (
      this.feed.staleMaxAgeMs > 0 &&
      this.cached &&
      staleAge <= this.feed.staleMaxAgeMs
    ) {
      this.logger.warn(
        `Serving last known feed (${this.cached.items.length} item(s), ${staleAge}ms old)`,
      );
      return of(this.cached.items);
    }

    return throwError(() => new RpcException('Unable to get Rss Feed'));
  }

  /** Détaille l'erreur réseau */
  private describeError(err: any): string {
    const details = [];
    if (err?.code) details.push(`code=${err.code}`);
    if (err?.errno !== undefined && err?.errno !== null) {
      details.push(`errno=${err.errno}`);
    }
    if (err?.syscall) details.push(`syscall=${err.syscall}`);
    if (err?.address) {
      details.push(`address=${err.address}${err.port ? ':' + err.port : ''}`);
    }
    if (err?.response?.status) details.push(`status=${err.response.status}`);
    details.push(`message=${err?.message}`);
    return details.join(' ');
  }
}
