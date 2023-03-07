import { APP_INITIALIZER, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { BurgerMenuPage } from './burger-menu/burger-menu.page';
import { ProjectModuleService } from '@ul/shared';
import { MenuRoutingModule } from './menu-routing.module';
import { TranslateModule } from '@ngx-translate/core';

const initModule = (projectModuleService: ProjectModuleService) =>
  () => projectModuleService.initProjectModule({
    name: 'menu',
    translation: true,
    menuItems: [{
      title: 'MENU.MENU',
      icon: 'menu',
      position: 999,
      path: `/${MenuModule.path}`,
      type: 'tabs',
    }]
  });

@NgModule({
  declarations: [BurgerMenuPage],
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MenuRoutingModule,
    TranslateModule,
  ],
  providers: [{
    provide: APP_INITIALIZER,
    useFactory: initModule,
    deps:[ProjectModuleService],
    multi: true
  }],
})
export class MenuModule {
  static path = 'menu';
}
