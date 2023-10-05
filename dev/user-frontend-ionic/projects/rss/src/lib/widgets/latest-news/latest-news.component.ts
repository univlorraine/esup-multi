import { Component, OnInit } from '@angular/core';
import { filter, first, Observable, switchMap } from 'rxjs';
import { finalize, map, take } from 'rxjs/operators';
import { FeedItem, rssFeed$, setRssFeed } from '../../rss.repository';
import { RssService } from '../../rss.service';
import { NetworkService } from '@ul/shared';

@Component({
  selector: 'app-latest-news-widget',
  templateUrl: './latest-news.component.html',
  styleUrls: ['latest-news.component.scss'],
})
export class LatestNewsComponent implements OnInit {
  public isLoading = false;
  public latestNews$: Observable<FeedItem>;

  constructor(
    private rssService: RssService,
    private networkService: NetworkService
  ) {
    this.latestNews$ = rssFeed$.pipe(
      map(rssFeed => rssFeed[0])
    );
  }

  ngOnInit(): void {
    this.loadRssFeedIfNetworkAvailable();
  }

  private loadRssFeedIfNetworkAvailable() {
    this.networkService.isOnline$.pipe(
      first(),
      filter(isOnline => isOnline),
      switchMap(() => {
        this.isLoading = true;
        return this.rssService.getRssFeed().pipe(
          take(1),
          finalize(() => this.isLoading = false)
        );
      })
    ).subscribe(setRssFeed);
  }
}
