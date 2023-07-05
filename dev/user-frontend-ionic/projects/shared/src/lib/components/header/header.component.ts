import { Component, Input } from '@angular/core';
import { Observable } from 'rxjs';
import { PageLayoutService, PageTitle } from '../../navigation/page-layout.service';
import { NetworkService } from '../../network/network.service';

@Component({
  selector: 'app-header',
  templateUrl: 'header.component.html',
  styleUrls: ['header.component.scss']
})
export class HeaderComponent {

  @Input() backRouterLink = '';

  public currentPageTitle$: Observable<PageTitle>;
  public showCurrentPageHeader$: Observable<boolean>;
  public isOnline$: Observable<boolean>;

  constructor(private pageLayoutService: PageLayoutService,
    private networkService: NetworkService,) {
    this.currentPageTitle$ = this.pageLayoutService.currentPageTitle$;
    this.showCurrentPageHeader$ = this.pageLayoutService.showCurrentPageHeader$;
    this.isOnline$ = this.networkService.isOnline$;
  }
}
