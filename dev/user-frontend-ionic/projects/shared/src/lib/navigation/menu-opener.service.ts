import { Injectable } from '@angular/core';
import { MenuItem, MenuItemExternalLink, MenuItemLinkType, MenuItemRouterLink, MenuItemSsoLink } from './menu.model';
import { Router } from '@angular/router';
import { Browser } from '@capacitor/browser';
import { SsoService } from '../sso/sso.service';
import { StatisticsService } from '../statistics/statistics.service';
import { from } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class MenuOpenerService {

    constructor(
        private router: Router,
        private ssoService: SsoService,
        private statisticsService: StatisticsService,
    ) {}

    public async open(menuItem: MenuItem) {
        this.statisticsService.onFunctionalityOpened(menuItem.statisticName);
        switch(menuItem.link.type) {
            case MenuItemLinkType.router:
                return this.openRouterLink(menuItem.link);
            case MenuItemLinkType.external:
                return this.openExternalLink(menuItem.link);
            case MenuItemLinkType.sso:
                return this.openSsoLink(menuItem.link);
        }
    }

    private async openRouterLink(link: MenuItemRouterLink) {
        return this.router.navigateByUrl(link.routerLink);
    }

    private async openExternalLink(link: MenuItemExternalLink) {
        if(!link.url) {
            return;
        }
        return Browser.open({url: link.url});
    }

    private async openSsoLink(link: MenuItemSsoLink) {
        const url = await from(this.ssoService.getSsoExternalLink({
            urlTemplate: link.urlTemplate,
            service: link.service
        })).toPromise();
        return Browser.open({url });
    }
}
