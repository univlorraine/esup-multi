import { Component, OnInit, QueryList, ViewChildren, ViewContainerRef } from '@angular/core';
import { PreferencesComponent, PreferencesService } from '@ul/shared';

@Component({
  selector: 'app-preferences',
  templateUrl: './preferences.page.html',
  styleUrls: ['./preferences.page.scss'],
})
export class PreferencesPage implements OnInit {

  @ViewChildren('preferences', {read: ViewContainerRef}) preferences: QueryList<ViewContainerRef>;

  public preferencesComponents: PreferencesComponent[] = [];

  constructor(
    private preferencesService: PreferencesService
  ) { }

  ngOnInit(): void {
    this.preferencesComponents = this.preferencesService.getPreferencesComponents();
  }

  ionViewWillEnter(): void {
    this.preferences.forEach((viewContainerRef: ViewContainerRef, index: number) => {
      viewContainerRef.clear();
      const componentToCreate = this.preferencesComponents[index].component;
      viewContainerRef.createComponent(componentToCreate);
    });
  }

}
