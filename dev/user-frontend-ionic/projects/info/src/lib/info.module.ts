import { CommonModule } from '@angular/common';
import { APP_INITIALIZER, NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { InfoPageRoutingModule } from './info-routing.module';

import { ProjectModuleService } from '@ul/shared';
import { InfoPage } from './info.page';
import { TranslateModule } from '@ngx-translate/core';

const initModule = (projectModuleService: ProjectModuleService) =>
  () => projectModuleService.initProjectModule({
    name: 'info',
    translation: true,
    menuItem: {
      title: 'INFO.MENU',
      icon: 'information-circle',
      position: 50,
      path: InfoPageModule.path
    }
  });

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    InfoPageRoutingModule,
    TranslateModule
  ],
  declarations: [InfoPage],
  providers: [{
    provide: APP_INITIALIZER,
    useFactory: initModule,
    deps:[ProjectModuleService],
    multi: true
  }],
})
export class InfoPageModule {
  static path = 'info';
}
