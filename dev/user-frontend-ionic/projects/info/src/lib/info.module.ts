import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { InfoPageRoutingModule } from './info-routing.module';

import { addMenuItem } from '@ul/shared';
import { InfoPage } from './info.page';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    InfoPageRoutingModule
  ],
  declarations: [InfoPage]
})
export class InfoPageModule {
  static path = 'info';

  constructor() {
    addMenuItem({
      title: 'Info',
      icon: 'information-circle',
      position: 50,
      path: InfoPageModule.path
    });
  }
}
