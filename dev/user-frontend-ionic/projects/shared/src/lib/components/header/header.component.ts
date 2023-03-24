import { Component, Input } from '@angular/core';
import { PageLayoutService, PageTitle } from '../../navigation/page-layout.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-header',
  templateUrl: 'header.component.html',
  styleUrls: ['header.component.scss']
})
export class HeaderComponent {

  @Input() backRouterLink = '';

  public currentPageTitle$: Observable<PageTitle>;
  public showCurrentPageHeader$: Observable<boolean>;

  constructor(private pageLayoutService: PageLayoutService) {
    this.currentPageTitle$ = this.pageLayoutService.currentPageTitle$;
    this.showCurrentPageHeader$ = this.pageLayoutService.showCurrentPageHeader$;
  }
}
