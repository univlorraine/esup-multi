import { Component, OnInit, QueryList, Type, ViewChildren, ViewContainerRef } from '@angular/core';
import { ProjectModuleService } from '@ul/shared';

@Component({
  selector: 'app-preferences',
  templateUrl: './preferences.page.html',
  styleUrls: ['./preferences.page.scss'],
})
export class PreferencesPage implements OnInit {

  @ViewChildren('preferences', {read: ViewContainerRef}) preferences: QueryList<ViewContainerRef>;

  public preferencesComponents: Type<any>[] = [];

  constructor(
    private projectModuleService: ProjectModuleService
  ) { }

  ngOnInit(): void {
    this.preferencesComponents = this.projectModuleService.getPreferencesComponents();
  }

  ionViewWillEnter(): void {
    this.preferences.forEach((viewContainerRef: ViewContainerRef, index: number) => {
      viewContainerRef.clear();
      const componentToCreate = this.preferencesComponents[index];
      viewContainerRef.createComponent(componentToCreate);
    });
  }

}
