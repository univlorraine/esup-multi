import { Component } from '@angular/core';
import { NavigationService, PageLayoutsService, PageTitle, ProjectModuleService } from '@ul/shared';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-full-layout',
  templateUrl: 'full-layout.page.html',
  styleUrls: ['full-layout.page.scss']
})
export class FullLayoutPage {

  public currentPageTitle$: Observable<PageTitle>;
  public showHeader$: Observable<boolean>;

  constructor(
    private pageLayoutService: PageLayoutsService,
    private navigationService: NavigationService,
    private projectModuleService: ProjectModuleService,
  ) {
    this.currentPageTitle$ = this.pageLayoutService.currentPageTitle$;

    this.showHeader$ = this.navigationService.navigationRouterLink$.pipe(
      map(navigationRouterLink => this.projectModuleService.getPageConfigurationByRouterLink(navigationRouterLink.current)),
      map(pageConfiguration => pageConfiguration ? pageConfiguration.disableAutoHeader === false : true)
    );
  }
}
