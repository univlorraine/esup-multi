import { Component } from '@angular/core';
import { ProjectModuleService } from '@ul/shared';

@Component({
  selector: 'app-tabs-layout',
  templateUrl: 'tabs-layout.page.html',
  styleUrls: ['tabs-layout.page.scss']
})
export class TabsLayoutPage {

  public tabsMenuItems;
  public topBarMenuItems;

  constructor(
    private projectModuleService: ProjectModuleService
  ) {
    this.tabsMenuItems = this.projectModuleService.getMenuItemsByType('tabs');
    this.topBarMenuItems = this.projectModuleService.getMenuItemsByType('top');
  }

}
