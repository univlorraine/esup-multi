import { CommonModule } from '@angular/common';
import { APP_INITIALIZER, NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { TranslateModule } from '@ngx-translate/core';
import { ProjectModuleService, SharedComponentsModule } from '@ul/shared';
import { BurgerMenuPage } from './burger-menu/burger-menu.page';
import { MenuRoutingModule } from './menu-routing.module';

const initModule = (projectModuleService: ProjectModuleService) =>
  () => projectModuleService.initProjectModule({
    name: 'menu',
    translation: true,
    menuItems: [{
      title: 'MENU.MENU',
      icon: 'menu',
      position: 999,
      routerLink: MenuModule.routerLink,
      type: 'tabs:end',
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
    SharedComponentsModule
  ],
  providers: [{
    provide: APP_INITIALIZER,
    useFactory: initModule,
    deps:[ProjectModuleService],
    multi: true
  }],
})
export class MenuModule {
  static routerLink = '/menu';
}
