import { Component } from '@angular/core';
import { ProjectModuleService } from '@ul/shared';

@Component({
  selector: 'app-tabs-layout',
  templateUrl: 'tabs-layout.page.html',
  styleUrls: ['tabs-layout.page.scss']
})
export class TabsLayoutPage {

  public menuItems;

  constructor(
    private projectModuleService: ProjectModuleService
  ) {
    this.menuItems = this.projectModuleService.getMenuItemsByType('tabs');
  }

}
