import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PreferencesPageRoutingModule } from './preferences-routing.module';

import { PreferencesPage } from './preferences.page';
import { ProjectModuleService } from '@ul/shared';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PreferencesPageRoutingModule
  ],
  declarations: [PreferencesPage]
})
export class PreferencesPageModule {
  static path = 'preferences';

  constructor(private projectModuleService: ProjectModuleService) {
    this.projectModuleService.initProjectModule({
      name: 'preferences',
      translation: true,
      menuItem: {
        title: 'PREFERENCES.MENU',
        icon: 'settings',
        position: 900,
        path: PreferencesPageModule.path
      }
    });
  }
}
