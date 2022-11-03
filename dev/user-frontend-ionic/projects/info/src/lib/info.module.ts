import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { InfoPageRoutingModule } from './info-routing.module';

import { ProjectModuleService } from '@ul/shared';
import { InfoPage } from './info.page';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    InfoPageRoutingModule,
    TranslateModule
  ],
  declarations: [InfoPage]
})
export class InfoPageModule {
  static path = 'info';

  constructor(private projectModuleService: ProjectModuleService) {
    this.projectModuleService.initProjectModule({
      name: 'info',
      translation: true,
      menuItem: {
        title: 'INFO.MENU',
        icon: 'information-circle',
        position: 50,
        path: InfoPageModule.path
      }
    });
  }
}
