import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { first } from 'rxjs/operators';
import { StaticPagesRepository, TranslatedStaticPage } from '../static-pages.repository';
import { StaticPagesService } from '../static-pages.service';

@Component({
  selector: 'app-static-page',
  templateUrl: './static-page.component.html',
  styleUrls: ['./static-page.component.scss'],
})
export class StaticPageComponent implements OnInit {

  public translatedStaticPages$: Observable<TranslatedStaticPage[]>;
  public page$: Observable<TranslatedStaticPage>;

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

    const id = parseInt(this.route.snapshot.paramMap.get('id'), 10);

    this.page$ = this.staticPagesRepository.getStaticPage(id);
  }
}
