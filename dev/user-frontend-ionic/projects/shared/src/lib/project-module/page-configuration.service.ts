import { Injectable } from '@angular/core';

export interface PageConfiguration {
    routerLink: string;
    disableAutoHeader: boolean;
}

@Injectable({
    providedIn: 'root'
})
export class PageConfigurationService {

    private pageConfigurations: PageConfiguration[] = [];

    public addPageConfigurations(pageConfigurations: PageConfiguration[]) {
        pageConfigurations.forEach(pageConfiguration => this.addPageConfiguration(pageConfiguration));
    }

    public getPageConfigurationByRouterLink(routerLink: string) {
        return this.pageConfigurations.find(pageConfiguration => pageConfiguration.routerLink.startsWith(routerLink));
    }

    private addPageConfiguration(pageConfiguration: PageConfiguration) {
        this.pageConfigurations.push(pageConfiguration);
        //sort by deepest routerLink first
        this.pageConfigurations.sort((pcA, pcB) => pcB.routerLink.split(('/')).length - pcA.routerLink.split(('/')).length);
    }

}
