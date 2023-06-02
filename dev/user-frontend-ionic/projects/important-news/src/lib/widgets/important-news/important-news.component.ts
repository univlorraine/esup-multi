import { Component, Inject, OnInit } from '@angular/core';
import { Browser } from '@capacitor/browser';
import { Router } from '@angular/router';
import { currentLanguage$, StatisticsService } from '@ul/shared';
import { combineLatest, Observable } from 'rxjs';
import { finalize, first, map } from 'rxjs/operators';
import { ImportantNews, importantNewsList$, setImportantNews as setImportantNewsList } from '../../important-news.repository';
import { ImportantNewsService } from '../../important-news.service';
import { TranslatedImportantNews } from './../../important-news.repository';


@Component({
  selector: 'app-important-news-widget',
  templateUrl: './important-news.component.html',
  styleUrls: ['./important-news.component.scss'],
})
export class ImportantNewsComponent implements OnInit {

  public isLoading = false;
  public importantNewsList$: Observable<ImportantNews[]> = importantNewsList$;
  public noImportantNews$: Observable<boolean>;
  public translatedImportantNewsList$: Observable<TranslatedImportantNews[]>;
  public cmsPublicAssetsEndpoint = this.environment.cmsPublicAssetsEndpoint;
  public randomImportantNews$: Observable<TranslatedImportantNews | undefined>;


  constructor(
    @Inject('environment')
    private environment: any,
    private importantNewsService: ImportantNewsService,
    private router: Router,
    private statisticsService: StatisticsService,
  ) {
    this.noImportantNews$ = this.importantNewsList$.pipe(
      map(importantNewsList => !importantNewsList || importantNewsList.length === 0)
    );

    this.translatedImportantNewsList$ = combineLatest([this.importantNewsList$, currentLanguage$])
      .pipe(
        map(importantNewsListAndCurrentLang => this.importantNewsService.mapToTranslatedImportantNews(importantNewsListAndCurrentLang))
      );

    this.randomImportantNews$ = this.translatedImportantNewsList$.pipe(
      map(translatedImportantNewsList => {
        if (!translatedImportantNewsList || translatedImportantNewsList.length === 0) {
          return undefined;
        }
        const randomIndex = Math.floor(Math.random() * translatedImportantNewsList.length);
        return translatedImportantNewsList[randomIndex];
      })
    );
  }

  ngOnInit(): void {
    this.isLoading = true;
    this.importantNewsService.loadImportantNewsList().pipe(
      first(),
      finalize(() => this.isLoading = false)
    ).subscribe(importantNewsList => {
      setImportantNewsList(importantNewsList);
    });
  }

  public onClick(importantNews: TranslatedImportantNews): Promise<void|boolean> {
    if (!importantNews.link) {
      return;
    }

    this.statisticsService.onFunctionalityOpened(importantNews.statisticName);

    if(importantNews.link.startsWith('/')) {
      return this.router.navigateByUrl(importantNews.link);
    } else {
      return Browser.open({ url: importantNews.link });
    }
  }
}
