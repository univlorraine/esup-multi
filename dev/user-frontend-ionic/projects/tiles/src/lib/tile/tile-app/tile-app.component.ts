import { AfterViewInit, ChangeDetectorRef, Component, Input, ViewChild, ViewContainerRef } from '@angular/core';
import { Router } from '@angular/router';
import { ProjectModuleService } from '@ul/shared';
import { TranslatedApp } from '../../tiles.repository';

@Component({
selector: 'app-tile-app',
templateUrl: './tile-app.component.html',
styleUrls: ['./tile-app.component.scss'],
})
export class TileAppComponent implements AfterViewInit {
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
        this.router.navigate([this.app.path]);
    }
}
