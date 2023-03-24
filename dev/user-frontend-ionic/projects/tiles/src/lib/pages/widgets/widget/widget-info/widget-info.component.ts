import { AfterViewInit, ChangeDetectorRef, Component, Input, ViewChild, ViewContainerRef } from '@angular/core';
import { Browser } from '@capacitor/browser';
import { ProjectModuleService, SsoService, TranslatedInfo } from '@ul/shared';

@Component({
selector: 'app-widget-info',
templateUrl: './widget-info.component.html',
styleUrls: ['./widget-info.component.scss'],
})
export class WidgetInfoComponent implements AfterViewInit {
    @Input() info: TranslatedInfo;
    @ViewChild('widget', {read: ViewContainerRef}) widgetContainerRef: ViewContainerRef;

    constructor(
        private ssoService: SsoService,
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

        this.ssoService.getSsoExternalLink({
          urlTemplate: this.info.link,
          service: this.info.ssoService
        })
        .subscribe(url => Browser.open({url }));
  }
}
