import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { GeoPageRoutingModule } from './geo-routing.module';

import { addMenuItem } from '@ul/shared';
import { GeoPage } from './geo.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    GeoPageRoutingModule
  ],
  declarations: [GeoPage]
})
export class GeoPageModule {
  static PATH = 'geo';

  constructor() {
    addMenuItem({
      title: 'Geo',
      icon: 'compass',
      position: 20,
      path: GeoPageModule.PATH
    })
  }
}
