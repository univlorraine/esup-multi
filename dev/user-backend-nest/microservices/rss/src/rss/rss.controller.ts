import { CacheInterceptor, CacheKey } from '@nestjs/cache-manager';
import { Controller, UseInterceptors } from '@nestjs/common';
import { MessagePattern } from '@nestjs/microservices';
import { Observable } from 'rxjs';
import { FeedItem } from './feed-item.dto';
import { RssService } from './rss.service';

@Controller()
export class RssController {
  constructor(private readonly appService: RssService) {}

  @MessagePattern({ cmd: 'rss' })
  @CacheKey('rss')
  @UseInterceptors(CacheInterceptor)
  getRssFeed(): Observable<FeedItem[]> {
    return this.appService.getRssFeed();
  }
}
