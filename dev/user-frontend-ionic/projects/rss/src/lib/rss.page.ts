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

import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Browser } from '@capacitor/browser';
import { NetworkService } from '@ul/shared';
import { Observable, Subscription } from 'rxjs';
import { finalize, map } from 'rxjs/operators';
import { FeedItem, rssFeed$, setRssFeed } from './rss.repository';
import { RssService } from './rss.service';

@Component({
  selector: 'app-rss',
  templateUrl: './rss.page.html',
  styleUrls: ['../../../../src/theme/app-theme/rss/rss.page.scss'],
})
export class RssPage {
  public rssFeed$: Observable<FeedItem[]> = rssFeed$;
  public rssFeedIsEmpty$: Observable<boolean>;
  public isLoading = false;
  public isContentVisible: boolean[] = [];
  public openItemGuid: string;
  private subscriptions: Subscription[] = [];

  constructor(
    private rssService: RssService,
    private networkService: NetworkService,
    private route: ActivatedRoute,
  ) {
    this.rssFeedIsEmpty$ = this.rssFeed$.pipe(map(rssFeed => rssFeed.length === 0));
  }

  public onClick(item: FeedItem): Promise<void> {
    if (!item.link) {
      return;
    }
    return Browser.open({ url: item.link });
  }

  async ionViewWillEnter() {
    this.subscriptions.push(
      this.route.queryParams.subscribe(params => {
        this.openItemGuid = params.guid;
      })
    );
    await this.loadRssFeedIfNetworkAvailable();
  }

  ionViewDidLeave() {
    this.subscriptions.forEach(subscription => subscription.unsubscribe());
    this.subscriptions = [];
  }

  public openContent(index: number) {
    this.isContentVisible[index] = !this.isContentVisible[index];
  }

  private async loadRssFeedIfNetworkAvailable() {
    // skip if network is not available
    if (!(await this.networkService.getConnectionStatus()).connected) {
      return;
    }
    this.isLoading = true;
    this.subscriptions.push(
      this.rssService.getRssFeed()
        .pipe(
          finalize(() => this.isLoading = false)
        ).subscribe(rssFeed => {
        setRssFeed(rssFeed);
        this.isContentVisible = new Array(rssFeed.length).fill(false);
        if (this.openItemGuid) {
          const index = rssFeed.findIndex(item => item.guid === this.openItemGuid);
          if (index >= 0) {
            this.openContent(index);
          }
        }
      })
    );
  }
}
