import { AfterViewInit, Component } from '@angular/core';
import { NavController } from '@ionic/angular';
import {
  FeaturesService, GuidedTourService, MenuItem, MenuItemLinkType, MenuItemRouterLink,
  MenuOpenerService, MenuService, NetworkService, NotificationsService, StatisticsService
} from '@ul/shared';
import { Observable } from 'rxjs';
import { map, take, tap } from 'rxjs/operators';

interface MenuItemWithOptionalRouterLink extends MenuItem {
  routerLink: string;
}

@Component({
  selector: 'app-tabs-layout',
  templateUrl: 'tabs-layout.page.html',
  styleUrls: ['tabs-layout.page.scss']
})
export class TabsLayoutPage implements AfterViewInit {

  public isLoading = false;
  public topMenuItems$: Observable<MenuItem[]>;
  public tabsMenuItems$: Observable<MenuItemWithOptionalRouterLink[]>;
  public isOnline$: Observable<boolean>;
  public menuItemHasBadge: boolean[];

  constructor(
    private navController: NavController,
    private menuService: MenuService,
    private featuresService: FeaturesService,
    private statisticsService: StatisticsService,
    private guidedTourService: GuidedTourService,
    public menuOpenerService: MenuOpenerService,
    private networkService: NetworkService,
    private notificationsService: NotificationsService
  ) {
    this.isOnline$ = this.networkService.isOnline$;
    this.tabsMenuItems$ = this.menuService.tabsMenuItems$.pipe(
      map(menuItems => menuItems.map(menuItem => {
        if (menuItem.link.type !== MenuItemLinkType.router) {
          return {
            ...menuItem,
            routerLink: null
          };
        }

        return {
          ...menuItem,
          routerLink: (menuItem.link as MenuItemRouterLink).routerLink
        };
      }))
    );
    this.topMenuItems$ = this.menuService.topMenuItems$;

    this.topMenuItems$.pipe(
      tap(menuItems => {
        this.menuItemHasBadge = menuItems.map(() => false);

        const indexNotifMenuItem = menuItems.findIndex(menuItem =>
          menuItem.link.type === MenuItemLinkType.router && (menuItem.link as MenuItemRouterLink).routerLink === '/notifications');
        if (indexNotifMenuItem !== -1) {
          this.notificationsService.loadNotifications(0, 10).pipe(
            take(1),
            tap((notifications) => {
              this.menuItemHasBadge[indexNotifMenuItem] = notifications.find(notification => notification.state === 'UNREAD') !== undefined;
            })
          ).subscribe();
        }
      })
    ).subscribe();
  }

  ngAfterViewInit() {
    this.loadFeatures();
  }

  public async openExternalOrSsoLinkOnly(menuItem: MenuItem) {
    if (menuItem.link.type === MenuItemLinkType.router) {
      this.statisticsService.onFunctionalityOpened(menuItem.statisticName);
      this.navController.setDirection('forward', false);
      return;
    }

    return this.menuOpenerService.open(menuItem);
  }

  public generateMenuItemIdFromRouterLink(menuItem: MenuItemWithOptionalRouterLink){
    if(!menuItem.routerLink) {
      return;
    }
    return menuItem.routerLink.substring(1).replace('/', '-');
  }

  public getMenuId(menuItem: MenuItem){
    return this.guidedTourService.generateMenuItemIdFromTitle(menuItem);
  }

  public hasBadge(index: number): boolean {
    return this.menuItemHasBadge[index] ?? false;
  }

  private async loadFeatures(): Promise<void> {
    // skip if network is not available
    if (!(await this.networkService.getConnectionStatus()).connected) {
      return;
    }

    this.isLoading = true;
    this.featuresService.loadAndStoreFeatures().subscribe(() => this.isLoading = false);
  }
}
