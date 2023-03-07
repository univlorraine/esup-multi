import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { PageLayout, PageLayoutsService, currentLanguage$ } from '@ul/shared';
import { Observable, Subscription } from 'rxjs';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent implements OnInit, OnDestroy {

  public languages: Array<string> = [];
  public currentPageLayout$: Observable<PageLayout>;
  private subscriptions: Subscription[] = [];

  constructor(
    @Inject('environment')
    private environment: any,
    private translateService: TranslateService,
    private pageLayoutsService: PageLayoutsService,
  ) {
    // Define available languages in app
    this.languages = this.environment.languages;
    this.translateService.addLangs(this.languages);

    this.currentPageLayout$ = this.pageLayoutsService.currentPageLayout$;
  }

  ngOnInit() {
    // apply language saved in persistent state
    this.subscriptions.push( currentLanguage$
      .subscribe(language => this.translateService.use(language || this.environment.defaultLanguage))
    );
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(s => s.unsubscribe());
  }
}
