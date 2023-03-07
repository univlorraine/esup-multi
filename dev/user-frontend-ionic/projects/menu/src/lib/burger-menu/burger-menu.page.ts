import { Component, Inject } from '@angular/core';
import { ProjectModuleService, updateLanguage } from '@ul/shared';

@Component({
  selector: 'app-menu',
  templateUrl: './burger-menu.page.html',
  styleUrls: ['./burger-menu.page.scss'],
})
export class BurgerMenuPage {

  public menuItems;
  public languages: Array<string> = [];

  constructor(
    @Inject('environment')
    private environment: any,
    private projectModuleService: ProjectModuleService,
  ) {
    this.languages = this.environment.languages;
    this.menuItems = this.projectModuleService.getMenuItemsByType('burger');
  }

  useLanguage(language: string): void {
    updateLanguage(language);
  }

}
