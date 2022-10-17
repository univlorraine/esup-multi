import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { HelloPageRoutingModule } from './hello-routing.module';

import { HelloPage } from './hello.page';

import { addMenuItem } from '@ul/shared';



@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    HelloPageRoutingModule
  ],
  declarations: [HelloPage]
})
export class HelloPageModule {

  static PATH = 'hello';

  constructor() {
    addMenuItem({
      title: 'Hello',
      icon: 'hand-left',
      position: 10,
      path: HelloPageModule.PATH
    })
  }
}
