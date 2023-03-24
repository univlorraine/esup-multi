import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { map } from 'rxjs/operators';
import { ProjectModuleService } from '../project-module/project-module.service';
import { TilesService, TranslatedApp, TranslatedInfo, TranslatedTile } from '../tiles/tiles.service';
import { TileType } from '../tiles/tiles.repository';
import { StaticMenuType, StaticMenuItem } from '../project-module/static-menu.service';
import { MenuItem, MenuItemLink, MenuItemLinkType } from './menu.model';



@Injectable({
    providedIn: 'root'
})
export class MenuService {

    public tabsMenuItems$ = new BehaviorSubject<MenuItem[]>([]);
    public topMenuItems$ = new BehaviorSubject<MenuItem[]>([]);
    public burgerMenuItems$ = new BehaviorSubject<MenuItem[]>([]);
    public allMenuItems$ = new BehaviorSubject<MenuItem[]>([]);
    private allStaticMenuItems: MenuItem[];
    private tabsStaticMenuItemsStart: MenuItem[];
    private tabsStaticMenuItemsEnd: MenuItem[];
    private burgerStaticMenuItems: MenuItem[];

    constructor(
      private projectModuleService: ProjectModuleService,
      private tilesService: TilesService,
    ) {
      this.allStaticMenuItems = this.getStaticMenuItems();
      this.tabsStaticMenuItemsStart = this.getStaticMenuItemsByType('tabs:start');
      this.tabsStaticMenuItemsEnd = this.getStaticMenuItemsByType('tabs:end');
      this.burgerStaticMenuItems = this.getStaticMenuItemsByType('burger');
      this.tabsMenuItems$.next([
        ...this.tabsStaticMenuItemsStart,
        ...this.tabsStaticMenuItemsEnd,
      ]);

      // all menu items are a merge between static (from modules) and dynamic (from CMS) menu items
      this.tilesService.translatedTiles$.pipe(
        map(tiles => tiles.filter(tile => tile.menu)),
        map(tiles => tiles.map((app: TranslatedTile) => this.convertTranslatedTile(app))),
        map((dynamicMenuItems: MenuItem[]) => [
            ...this.allStaticMenuItems,
            ...dynamicMenuItems,
        ])
      ).subscribe(this.allMenuItems$);

      // burger menu items are a merge between static (from modules) and dynamic (from CMS) menu items
      this.tilesService.translatedTiles$.pipe(
        map(tiles => tiles.filter(tile => tile.menu === 'burger')),
        map(tiles => tiles.map((app: TranslatedTile) => this.convertTranslatedTile(app))),
        map((dynamicMenuItems: MenuItem[]) => [
            ...this.burgerStaticMenuItems,
            ...dynamicMenuItems,
        ])
      ).subscribe(this.burgerMenuItems$);


      // tabs menu items are a merge between static (from modules) and dynamic (from CMS) menu items
      this.tilesService.translatedTiles$.pipe(
        map(tiles => tiles.filter(tile => tile.menu === 'tabs')),
        map(tiles => tiles.map((app: TranslatedTile) => this.convertTranslatedTile(app))),
        map((dynamicMenuItems: MenuItem[]) => [
            ...this.tabsStaticMenuItemsStart,
            ...dynamicMenuItems,
            ...this.tabsStaticMenuItemsEnd,
        ])
      ).subscribe(this.tabsMenuItems$);

      // top menu items are fully dynamic (from CMS)
      this.tilesService.translatedTiles$.pipe(
        map(tiles => tiles.filter(tile => tile.menu === 'top')),
        map(tiles => tiles.map((app: TranslatedTile) => this.convertTranslatedTile(app)))
      ).subscribe(this.topMenuItems$);
    }

    public convertTranslatedTile(tile: TranslatedTile): MenuItem {
      switch(tile.type) {
        case TileType.app:
          return this.convertTranslatedApp(tile);
        case TileType.info:
          return this.convertTranslatedInfo(tile);
      }
    }

    private getStaticMenuItemsByType(menuType: StaticMenuType): MenuItem[] {
        return this.projectModuleService.getStaticMenuItemsByType(menuType)
        .map(menuItem => this.convertStaticMenuItem(menuItem));
    }

    private getStaticMenuItems(): MenuItem[] {
      return this.projectModuleService.getStaticMenuItems()
            .map(menuItem => this.convertStaticMenuItem(menuItem));
    }

    private convertStaticMenuItem(staticMenuItem: StaticMenuItem): MenuItem {
      return {
        icon: staticMenuItem.icon,
        title: staticMenuItem.title,
        link: {
            type: MenuItemLinkType.router,
            routerLink: staticMenuItem.routerLink
        },
        type: 'static',
      };
    }

    private convertTranslatedApp(app: TranslatedApp): MenuItem {
      return {
        icon: app.icon,
        title: app.title,
        link: {
          type: MenuItemLinkType.router,
          routerLink: app.routerLink
        },
        type: 'dynamic',
      };
    }


    private convertTranslatedInfo(app: TranslatedInfo): MenuItem {
      const link: MenuItemLink = (app.ssoService) ?
        {
          type: MenuItemLinkType.sso,
          urlTemplate: app.link,
          service: app.ssoService
        } :
        {
          type: MenuItemLinkType.external,
          url: app.link
        };

      return {
        icon: app.icon,
        title: app.title,
        link,
        type: 'dynamic',
      };
    }
}
