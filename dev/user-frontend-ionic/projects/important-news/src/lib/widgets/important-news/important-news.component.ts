import { Component, Inject, OnInit } from '@angular/core';
import { currentLanguage$ } from '@ul/shared';
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

  constructor(
    @Inject('environment')
    private environment: any,
    private importantNewsService: ImportantNewsService
  ) {
    this.noImportantNews$ = this.importantNewsList$.pipe(
      map(importantNewsList => !importantNewsList || importantNewsList.length === 0)
    );

    this.translatedImportantNewsList$ = combineLatest([this.importantNewsList$, currentLanguage$])
      .pipe(
        map(importantNewsListAndCurrentLang => this.importantNewsService.mapToTranslatedImportantNews(importantNewsListAndCurrentLang))
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
}
