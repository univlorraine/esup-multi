import { Component } from '@angular/core';
import { Browser } from '@capacitor/browser';
import { Network } from '@capacitor/network';
import { ActivatedRoute } from '@angular/router';
import { Observable, Subscription } from 'rxjs';
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
  public isContentVisible: boolean[] = [];
  public openItemGuid: string;
  private subscriptions: Subscription[] = [];

  constructor(
    private rssService: RssService,
    private route: ActivatedRoute
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
    if (!(await Network.getStatus()).connected) {
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
