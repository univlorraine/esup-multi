import { AfterViewInit, ChangeDetectorRef, Component, Input, ViewChild, ViewContainerRef } from '@angular/core';
import { Browser } from '@capacitor/browser';
import { getAuthToken, ProjectModuleService } from '@ul/shared';
import { filter, first, switchMap } from 'rxjs/operators';
import { TranslatedInfo } from '../../../../tiles.repository';
import { TilesService } from '../../../../tiles.service';

@Component({
selector: 'app-widget-info',
templateUrl: './widget-info.component.html',
styleUrls: ['./widget-info.component.scss'],
})
export class WidgetInfoComponent implements AfterViewInit {
    @Input() info: TranslatedInfo;
    @ViewChild('widget', {read: ViewContainerRef}) widgetContainerRef: ViewContainerRef;

    constructor(
        private tilesService: TilesService,
        private projectModuleService: ProjectModuleService,
        private cdr: ChangeDetectorRef,
    ) {}

    ngAfterViewInit() {
      this.widgetContainerRef.clear();
      if (this.info.widget) {
        const componentToCreate = this.projectModuleService.getWidgetComponent(this.info.widget);
        this.widgetContainerRef.createComponent(componentToCreate);
        this.cdr.detectChanges();
      }
    }

    public onClick(): Promise<void> {
        if (!this.info.link) {
        return;
        }

        if (!this.info.ssoService) {
        return Browser.open({ url: this.info.link });
        }

        getAuthToken().pipe(
            first(),
            filter(authToken => authToken != null),
            switchMap(authToken => this.tilesService.requestSsoServiceToken(this.info.ssoService, authToken))
        ).subscribe(serviceToken => {
            if (!serviceToken) {
                console.warn('No service token associated to url.');
                return;
            }

            return Browser.open({url: this.info.link.replace('{st}', serviceToken)});
        });
  }
}
