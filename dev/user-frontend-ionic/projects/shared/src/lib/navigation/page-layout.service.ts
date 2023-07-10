import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, combineLatest } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { NavigationService } from './navigation.service';
import { MenuService } from './menu.service';
import { MenuItemLinkType, MenuItemRouterLink } from './menu.model';

export type PageLayout = 'tabs' | 'full' | '' ;
export interface PageTitle {
  title: string;
  translated: boolean;
}
@Injectable({
    providedIn: 'root'
})
export class PageLayoutService {

    public currentPageLayout$: Observable<PageLayout>;
    public currentPageTitle$ = new BehaviorSubject<PageTitle>(null);
    public showCurrentPageHeader$ = new BehaviorSubject<boolean>(true);

    constructor(
      private navigationService: NavigationService,
      private menuService: MenuService,
    ) {
        this.currentPageLayout$ = combineLatest([
          this.navigationService.currentRouterLink$.pipe(filter(routerLink => routerLink !== '/')),
          this.menuService.tabsMenuItems$,
        ]).pipe(
          map(([routerLink, tabsMenuItems]) => (
            tabsMenuItems
              .filter(menuItem => menuItem.link.type === MenuItemLinkType.router)
              .map(menuItem => menuItem.link as MenuItemRouterLink)
              .find(link => routerLink.startsWith(link.routerLink))
              ? 'tabs' : 'full')
          )
        );

        this.currentPageLayout$.pipe(
          map(layout => layout === 'full')
        ).subscribe(this.showCurrentPageHeader$);

        // set current page title if current path matches any menu item
        combineLatest([
          this.navigationService.currentRouterLink$,
          this.menuService.allMenuItems$,
        ]).pipe(
          map(([routerLink, menuItems]) =>
            menuItems
            .filter(menuItem => menuItem.link.type === MenuItemLinkType.router)
            .find(menuItem => routerLink.startsWith((menuItem.link as MenuItemRouterLink).routerLink))),
          filter(menuItem => menuItem !== undefined),
          map(menuItem => ({
            title: menuItem.title,
            translated: menuItem.type === 'dynamic'
          }))
        ).subscribe(this.currentPageTitle$);
    }
}
