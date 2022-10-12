import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { GeoPageRoutingModule } from './geo-routing.module';

import { GeoPage } from './geo.page';
import { addMenuItem } from '@ul/shared';

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
      position: 2,
      path: GeoPageModule.PATH
    })
  }
}
