import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NetworkService } from '@ul/shared';
import { Observable } from 'rxjs';
import { take } from 'rxjs/operators';
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
    private staticPagesRepository: StaticPagesRepository,
    private networkService: NetworkService,
  ) {
    this.translatedStaticPages$ = this.staticPagesRepository.translatedStaticPages$;
  }

  ngOnInit() {
   this.loadStaticPagesIfNetworkAvailable();

    const id = parseInt(this.route.snapshot.paramMap.get('id'), 10);

    this.page$ = this.staticPagesRepository.getStaticPage(id);
  }

  public async loadStaticPagesIfNetworkAvailable(){
    if (!(await this.networkService.getConnectionStatus()).connected) {
      return;
    }

    this.staticPagesService.loadAndStoreStaticPages()
    .pipe(
      take(1)
    ).subscribe();
  }
}
