import { Component, ContentChild, Input, TemplateRef } from '@angular/core';
import { FeedItem } from '../../rss.repository';
import { RssItemHeaderButtonDirective } from './rss-item-header-button.directive';

@Component({
  selector: 'app-rss-item-header',
  templateUrl: './rss-item-header.component.html',
  styleUrls: ['rss-item-header.component.scss'],
})
export class RssItemHeaderComponent {
  @Input() item: FeedItem;
  @ContentChild(RssItemHeaderButtonDirective, { read: TemplateRef }) rssItemHeaderAction: TemplateRef<any>;

  constructor() {
  }

  public isMediaAnImage(media: any): boolean {
    const imageTypes: Array<string> = [
      'image/gif',
      'image/x-icon',
      'image/jpeg',
      'image/png',
      'image/svg+xml',
      'image/tiff',
      'image/webp'
    ];

    return media.type ? imageTypes.includes(media.type) : false;
  }
}
