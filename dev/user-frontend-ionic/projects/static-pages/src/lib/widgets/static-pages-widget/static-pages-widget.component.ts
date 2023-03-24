import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { first } from 'rxjs/operators';
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
    private staticPagesRepository: StaticPagesRepository
  ) {
    this.translatedStaticPages$ = this.staticPagesRepository.translatedStaticPages$;
  }

  ngOnInit() {
    this.staticPagesService.loadAndStoreStaticPages()
      .pipe(
        first()
      ).subscribe();

  }
}
