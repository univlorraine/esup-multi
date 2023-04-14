import { AfterViewInit, ChangeDetectorRef, Component, Input, ViewChild, ViewContainerRef } from '@angular/core';
import { ProjectModuleService } from '../../project-module/project-module.service';

@Component({
  selector: 'app-widget',
  templateUrl: './widget.component.html',
  styleUrls: ['./widget.component.scss'],
})
export class WidgetComponent implements AfterViewInit {
  @Input() widgetId: string;
  @ViewChild('widget', { read: ViewContainerRef }) widgetContainerRef: ViewContainerRef;

  constructor(
    private projectModuleService: ProjectModuleService,
    private cdr: ChangeDetectorRef,
  ) { }

  async ngAfterViewInit() {
    this.widgetContainerRef.clear();
    const componentToCreate = this.projectModuleService.getWidgetComponent(this.widgetId);
    if (componentToCreate) {
      this.widgetContainerRef.createComponent(componentToCreate);
      this.cdr.detectChanges();
    } else {
      console.warn(`'${this.widgetId}' is not found`);
    }
  }
}
