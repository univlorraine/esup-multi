import { Controller } from '@nestjs/common';
import { MessagePattern } from '@nestjs/microservices';
import { Observable } from 'rxjs';
import { FeedItem } from './feed-item.dto';
import { RssService } from './rss.service';

@Controller()
export class RssController {
  constructor(private readonly appService: RssService) {}

  @MessagePattern({ cmd: 'rss' })
  getRssFeed(): Observable<FeedItem[]> {
    return this.appService.getRssFeed();
  }
}
