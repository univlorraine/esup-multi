import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { MenuService } from '../project-module/menu.service';
import { NavigationService } from './navigation.service';


export type PageLayout = 'tabs' | 'full';
export interface PageTitle {
  title: string;
  translated: boolean;
}
@Injectable({
    providedIn: 'root'
})
export class PageLayoutsService {

    public currentPageLayout$: Observable<PageLayout>;
    public currentPageTitle$ = new BehaviorSubject<PageTitle>(null);

    constructor(
      private navigationService: NavigationService,
      private menuService: MenuService,
    ) {
        this.currentPageLayout$ = this.navigationService.navigationRouterLink$.pipe(
          map(routerLink =>
            this.menuService.getMenuItemsByType('tabs')
            .map(menu => menu.routerLink)
            .includes(routerLink.current) ? 'tabs' : 'full')
        );

        // set current page title if current routerLink matches any menu item
        this.navigationService.navigationRouterLink$.pipe(
          map(navigationRouterLink =>
            this.menuService.getMenuItems().find(menuItem => navigationRouterLink.current.startsWith(menuItem.routerLink))),
          filter(menuItem => menuItem !== undefined),
          map(menuItem => ({
            title: menuItem.title,
            translated: false
          }))
        ).subscribe(this.currentPageTitle$);
    }
}
