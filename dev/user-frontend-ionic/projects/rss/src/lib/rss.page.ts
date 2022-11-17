
import { Component } from '@angular/core';
import { Browser } from '@capacitor/browser';
import { Network } from '@capacitor/network';
import { Observable } from 'rxjs';
import { finalize, map } from 'rxjs/operators';
import { FeedItem, rssFeed$, setRssFeed } from './rss.repository';
import { RssService } from './rss.service';

@Component({
  selector: 'app-rss',
  templateUrl: './rss.page.html',
  styleUrls: ['./rss.page.scss'],
})
export class RssPage {
  public rssFeed$: Observable<FeedItem[]> = rssFeed$;
  public rssFeedIsEmpty$: Observable<boolean>;
  public isLoading = false;

  constructor(
    private rssService: RssService,
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
    await this.loadRssFeedIfNetworkAvailable();
  }

  private async loadRssFeedIfNetworkAvailable() {
    // skip if network is not available
    if (!(await Network.getStatus()).connected) {
      return;
    }
    this.isLoading = true;
    this.rssService.getRssFeed()
      .pipe(
        finalize(() => this.isLoading = false)
      ).subscribe(rssFeed => setRssFeed(rssFeed));
  }
}
