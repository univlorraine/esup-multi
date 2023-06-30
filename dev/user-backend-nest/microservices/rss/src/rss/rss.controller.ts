import { Controller } from '@nestjs/common';
import { MessagePattern } from '@nestjs/microservices';
import { Observable } from 'rxjs';
import { FeedItem } from './feed-item.dto';
import { RssService } from './rss.service';
import * as infosJsonData from '../infos.json';

@Controller()
export class RssController {
  constructor(private readonly appService: RssService) {}

  @MessagePattern({ cmd: 'rss' })
  getRssFeed(): Observable<FeedItem[]> {
    return this.appService.getRssFeed();
  }

  @MessagePattern({ cmd: 'health' })
  getHealthStatus() {
    return {
      message: 'up',
      name: infosJsonData.name,
      version: infosJsonData.version,
    };
  }

  @MessagePattern({ cmd: 'version' })
  getVersion() {
    return {
      version: infosJsonData.version,
    };
  }
}
