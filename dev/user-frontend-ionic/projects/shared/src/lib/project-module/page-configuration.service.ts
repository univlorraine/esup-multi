import { Injectable } from '@angular/core';

export interface PageConfiguration {
    path: string;
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

    public getPageConfigurationByPath(path: string) {
        return this.pageConfigurations.find(pageConfiguration => pageConfiguration.path.startsWith(path));
    }

    private addPageConfiguration(pageConfiguration: PageConfiguration) {
        this.pageConfigurations.push(pageConfiguration);
        //sort by deepest paths first
        this.pageConfigurations.sort((pcA, pcB) => pcB.path.split(('/')).length - pcA.path.split(('/')).length);
    }

}
