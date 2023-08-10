import { Component, OnInit } from '@angular/core';
import { Network } from '@capacitor/network';
import { Observable } from 'rxjs';
import { finalize, map, take } from 'rxjs/operators';
import { FeedItem, rssFeed$, setRssFeed } from '../../rss.repository';
import { RssService } from '../../rss.service';

@Component({
  selector: 'app-latest-news-widget',
  templateUrl: './latest-news.component.html',
  styleUrls: ['latest-news.component.scss'],
})
export class LatestNewsComponent implements OnInit {
  public isLoading = false;
  public latestNews$: Observable<FeedItem>;

  constructor(private rssService: RssService) {
    this.latestNews$ = rssFeed$.pipe(
      map(rssFeed => rssFeed[0])
    );
  }

  ngOnInit(): void {
    this.loadRssFeedIfNetworkAvailable();
  }

  private async loadRssFeedIfNetworkAvailable() {
    // skip if network is not available
    if (!(await Network.getStatus()).connected) {
      return;
    }
    this.isLoading = true;
    this.rssService.getRssFeed()
      .pipe(
        take(1),
        finalize(() => this.isLoading = false)
      ).subscribe(setRssFeed);
  }
}