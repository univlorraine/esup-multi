import { AfterViewInit, Component } from '@angular/core';
import { Network } from '@capacitor/network';
import { MenuItem, MenuItemLinkType, MenuItemRouterLink, MenuOpenerService, MenuService, TilesService } from '@ul/shared';
import { Observable } from 'rxjs';
import { finalize, map } from 'rxjs/operators';

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

  constructor(
    private menuService: MenuService,
    private tilesService: TilesService,
    public menuOpenerService: MenuOpenerService,
  ) {
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
  }

  ngAfterViewInit() {
    this.loadTilesList();
  }

  public async openExternalOrSsoLinkOnly(menuItem: MenuItem) {
    if (menuItem.link.type === MenuItemLinkType.router) {
      return;
    }

    return this.menuOpenerService.open(menuItem);
  }

  private async loadTilesList(): Promise<void> {
    // skip if network is not available
    if (!(await Network.getStatus()).connected) {
      return;
    }

    this.isLoading = true;
    this.tilesService.loadAndStoreTiles().pipe(
      finalize(() => this.isLoading = false)
    ).subscribe();
  }

}
