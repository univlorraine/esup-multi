import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { RpcException } from '@nestjs/microservices';
import { decode } from 'html-entities';
import * as Parser from 'rss-parser';
import { catchError, from, map, Observable } from 'rxjs';
import { FeedItem } from './feed-item.dto';
import { striptags } from 'striptags';

@Injectable()
export class RssService {
  private readonly logger = new Logger(RssService.name);
  private rssUrl: string;
  private readonly allowedHtmlTags: Set<string>;
  private rssParser = new Parser();

  constructor(private readonly configService: ConfigService) {
    this.rssUrl = this.configService.get<string>('rssUrl');
    this.allowedHtmlTags = new Set(
      this.configService.get<Array<string>>('allowedHtmlTags'),
    );
  }

  public getRssFeed(): Observable<FeedItem[]> {
    return from(this.rssParser.parseURL(this.rssUrl)).pipe(
      catchError((err: any) => {
        const errorMessage = 'Unable to get Rss Feed';
        this.logger.error(errorMessage, err);
        throw new RpcException(errorMessage);
      }),
      map((res: any) => {
        return res.items.map((item) => ({
          ...item,
          title: decode(item.title),
          content: striptags(item.content, {
            allowedTags: this.allowedHtmlTags,
          }),
        }));
      }),
    );
  }
}
