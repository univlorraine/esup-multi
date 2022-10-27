import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PreferencesPageRoutingModule } from './preferences-routing.module';

import { PreferencesPage } from './preferences.page';
import { addMenuItem } from '@ul/shared';

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

  constructor() {
    addMenuItem({
      title: 'Configuration',
      icon: 'settings',
      position: 900,
      path: PreferencesPageModule.path
    });
  }
}
