import { AfterViewInit, ChangeDetectorRef, Component, Input, ViewChild, ViewContainerRef,
  OnDestroy } from '@angular/core';
import { ProjectModuleService } from '../../project-module/project-module.service';
import { WidgetLifecycleService } from './widget-lifecycle.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-widget',
  templateUrl: './widget.component.html',
  styleUrls: ['./widget.component.scss'],
})
export class WidgetComponent implements AfterViewInit, OnDestroy {
  @Input() widgetId: string;
  @ViewChild('widget', { read: ViewContainerRef }) widgetContainerRef: ViewContainerRef;
  private widgetViewWillEnterSubscription: Subscription;
  private widgetViewDidEnterSubscription: Subscription;
  private widgetViewWillLeaveSubscription: Subscription;
  private widgetViewDidLeaveSubscription: Subscription;

  constructor(
    private projectModuleService: ProjectModuleService,
    private cdr: ChangeDetectorRef,
    private widgetLifecycleService: WidgetLifecycleService
  ) { }

  async ngAfterViewInit() {
    this.widgetContainerRef.clear();
    const componentToCreate = this.projectModuleService.getWidgetComponent(this.widgetId);
    if (componentToCreate) {
      const widgetInstance = this.widgetContainerRef.createComponent(componentToCreate).instance;
      this.handleWidgetLifecycle(widgetInstance);
      this.cdr.detectChanges();
    } else {
      console.warn(`'${this.widgetId}' is not found`);
    }
  }

  ngOnDestroy() {
    if(this.widgetViewWillEnterSubscription) {
      this.widgetViewWillEnterSubscription.unsubscribe();
    }
    if(this.widgetViewDidEnterSubscription) {
      this.widgetViewDidEnterSubscription.unsubscribe();
    }
    if(this.widgetViewWillLeaveSubscription) {
      this.widgetViewWillLeaveSubscription.unsubscribe();
    }
    if(this.widgetViewDidLeaveSubscription) {
      this.widgetViewDidLeaveSubscription.unsubscribe();
    }
  }

  private handleWidgetLifecycle(widgetInstance: any) {
    if (widgetInstance.widgetViewWillEnter && typeof widgetInstance.widgetViewWillEnter === 'function') {
      this.widgetViewWillEnterSubscription = this.widgetLifecycleService.widgetViewWillEnter(this.widgetId)
        .subscribe(() => widgetInstance.widgetViewWillEnter());
    }
    if (widgetInstance.widgetViewDidEnter && typeof widgetInstance.widgetViewDidEnter === 'function') {
      this.widgetViewDidEnterSubscription = this.widgetLifecycleService.widgetViewDidEnter(this.widgetId)
        .subscribe(() => widgetInstance.widgetViewDidEnter());
    }
    if (widgetInstance.widgetViewWillLeave && typeof widgetInstance.widgetViewWillLeave === 'function') {
      this.widgetViewWillLeaveSubscription = this.widgetLifecycleService.widgetViewWillLeave(this.widgetId)
        .subscribe(() => widgetInstance.widgetViewWillLeave());
    }
    if (widgetInstance.widgetViewDidLeave && typeof widgetInstance.widgetViewDidLeave === 'function') {
      this.widgetViewDidLeaveSubscription = this.widgetLifecycleService.widgetViewDidLeave(this.widgetId)
        .subscribe(() => widgetInstance.widgetViewDidLeave());
    }
  }
}
