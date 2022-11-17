import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { RpcException } from '@nestjs/microservices';
import parse from 'rss-to-json';
import { catchError, from, map, Observable } from 'rxjs';
import { FeedItem } from './feed-item.dto';

@Injectable()
export class RssService {
  private readonly logger = new Logger(RssService.name);
  private rssUrl: string;

  constructor(private readonly configService: ConfigService) {
    this.rssUrl = this.configService.get<string>('rssUrl');
  }

  public getRssFeed(): Observable<FeedItem[]> {
    return from(parse(this.rssUrl)).pipe(
      catchError((err: any) => {
        const errorMessage = 'Unable to get Rss Feed';
        this.logger.error(errorMessage, err);
        throw new RpcException(errorMessage);
      }),
      map((res) => {
        return res.items;
      }),
    );
  }
}
