import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { StatisticsService } from '@ul/shared';
import { Observable } from 'rxjs';
import { first } from 'rxjs/operators';
import { StaticPagesRepository, TranslatedStaticPage } from '../../static-pages.repository';
import { StaticPagesService } from '../../static-pages.service';
import { Network } from '@capacitor/network';

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
  ) {
    this.translatedStaticPages$ = this.staticPagesRepository.translatedStaticPages$;
  }

  async ngOnInit() {
    if (!(await Network.getStatus()).connected) {
      return;
    }

    this.staticPagesService.loadAndStoreStaticPages()
      .pipe(
        first()
      ).subscribe();
  }

  public onClick(page: TranslatedStaticPage): Promise<boolean> {
    this.statisticsService.onFunctionalityOpened(page.statisticName);
    return this.router.navigateByUrl(`/page/${page.id}`);
  }
}
