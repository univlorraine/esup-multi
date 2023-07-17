import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NetworkService, StatisticsService } from '@ul/shared';
import { Observable } from 'rxjs';
import { take } from 'rxjs/operators';
import { StaticPagesRepository, TranslatedStaticPage } from '../../static-pages.repository';
import { StaticPagesService } from '../../static-pages.service';

@Component({
  selector: 'app-static-pages-widget',
  templateUrl: './static-pages-widget.component.html',
  styleUrls: ['./static-pages-widget.component.scss'],
})
export class StaticPagesWidgetComponent implements OnInit {

  public translatedStaticPages$: Observable<TranslatedStaticPage[]>;

  constructor(private route: ActivatedRoute,
    private staticPagesService: StaticPagesService,
    private staticPagesRepository: StaticPagesRepository,
    private router: Router,
    private statisticsService: StatisticsService,
    private networkService: NetworkService,
  ) {
    this.translatedStaticPages$ = this.staticPagesRepository.translatedStaticPages$;
  }

  async ngOnInit() {
    if (!(await this.networkService.getConnectionStatus()).connected) {
      return;
    }

    this.staticPagesService.loadAndStoreStaticPages()
      .pipe(
        take(1)
      ).subscribe();
  }

  public onClick(page: TranslatedStaticPage): Promise<boolean> {
    this.statisticsService.onFunctionalityOpened(page.statisticName);
    return this.router.navigateByUrl(`/page/${page.id}`);
  }
}
