import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { InfoPageRoutingModule } from './info-routing.module';

import { InfoPage } from './info.page';
import { addMenuItem } from '@ul/shared';


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
  static PATH = 'info';

  constructor() {
    addMenuItem({
      title: 'Info',
      icon: 'information-circle',
      position: 50,
      path: InfoPageModule.PATH
    })
  }
}
