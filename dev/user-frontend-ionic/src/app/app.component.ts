import {Component, Inject, OnDestroy, OnInit} from '@angular/core';
import { currentLanguage$, ProjectModuleService, updateLanguage } from '@ul/shared';
import { LangChangeEvent, TranslateService} from '@ngx-translate/core';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent implements OnInit, OnDestroy {

  public menuItems;
  public languages: Array<string> = [];
  private subscriptions: Subscription[] = [];

  constructor(
    @Inject('environment')
    private environment: any,
    private projectModuleService: ProjectModuleService,
    private translateService: TranslateService
  ) {
    // Listen for translation events
    this.subscriptions.push(this.translateService.onLangChange
      .subscribe((event: LangChangeEvent) => {
        updateLanguage(event.lang);
      }));

    // Define available languages in app
    this.languages = this.environment.languages;
    this.translateService.addLangs(this.languages);
  }

  ngOnInit() {
    this.menuItems = this.projectModuleService.getMenuItems();

    // apply language saved in persistent state
    this.subscriptions.push( currentLanguage$
      .subscribe(l => this.useLanguage(l || this.environment.defaultLanguage))
    );
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(s => s.unsubscribe());
  }

  useLanguage(language: string): void {
    this.translateService.use(language);
  }
}
