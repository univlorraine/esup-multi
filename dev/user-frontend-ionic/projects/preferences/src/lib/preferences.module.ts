import { APP_INITIALIZER, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PreferencesPageRoutingModule } from './preferences-routing.module';

import { PreferencesPage } from './preferences.page';
import { ProjectModuleService } from '@ul/shared';

const initModule = (projectModuleService: ProjectModuleService) =>
  () => projectModuleService.initProjectModule({
    name: 'preferences',
    translation: true,
    menuItems: [{
      title: 'PREFERENCES.MENU',
      icon: 'settings',
      position: 900,
      path: PreferencesPageModule.path
    }]
  });

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PreferencesPageRoutingModule
  ],
  declarations: [PreferencesPage],
  providers: [{
    provide: APP_INITIALIZER,
    useFactory: initModule,
    deps:[ProjectModuleService],
    multi: true
  }],
})
export class PreferencesPageModule {
  static path = 'preferences';
}
