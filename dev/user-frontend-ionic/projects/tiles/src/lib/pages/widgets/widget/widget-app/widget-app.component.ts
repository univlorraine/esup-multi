import { AfterViewInit, ChangeDetectorRef, Component, Input, ViewChild, ViewContainerRef } from '@angular/core';
import { Router } from '@angular/router';
import { ProjectModuleService } from '@ul/shared';
import { TranslatedApp } from '@ul/shared';

@Component({
selector: 'app-widget-app',
templateUrl: './widget-app.component.html',
styleUrls: ['./widget-app.component.scss'],
})
export class WidgetAppComponent implements AfterViewInit {
    @Input() app: TranslatedApp;
    @ViewChild('widget', {read: ViewContainerRef}) widgetContainerRef: ViewContainerRef;

    constructor(
        private router: Router,
        private projectModuleService: ProjectModuleService,
        private cdr: ChangeDetectorRef,
    ) {}

    ngAfterViewInit() {
        this.widgetContainerRef.clear();
        if (this.app.widget) {
          const componentToCreate = this.projectModuleService.getWidgetComponent(this.app.widget);
          this.widgetContainerRef.createComponent(componentToCreate);
          this.cdr.detectChanges();
        }
      }

    public onClick() {
        this.router.navigate([this.app.routerLink]);
    }
}
