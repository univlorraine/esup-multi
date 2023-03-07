import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { NavigationService, PageLayoutsService, PageTitle } from '@ul/shared';
import { Observable } from 'rxjs';
import { first, map } from 'rxjs/operators';

@Component({
  selector: 'app-full-layout',
  templateUrl: 'full-layout.page.html',
  styleUrls: ['full-layout.page.scss']
})
export class FullLayoutPage {

  public currentPageTitle$: Observable<PageTitle>;

  constructor(
    private pageLayoutService: PageLayoutsService,
    private navigationService: NavigationService,
    private router: Router,
  ) {
    this.currentPageTitle$ = this.pageLayoutService.currentPageTitle$;
  }

  goBack() {
    this.navigationService.navigationPath$.pipe(
      first(),
      map(navigationPath => navigationPath.previous),
    ).subscribe(previousPath => this.router.navigateByUrl(previousPath));
  }
}
