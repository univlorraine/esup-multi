import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { TranslateModule } from '@ngx-translate/core';
import { ProjectModuleService } from '@ul/shared';
import { RssPageRoutingModule } from './rss-routing.module';
import { RssPage } from './rss.page';


@NgModule({
  imports: [
    CommonModule,
    IonicModule,
    RssPageRoutingModule,
    TranslateModule,
  ],
  declarations: [
    RssPage
  ],

})
export class RssPageModule {
  static path = 'rss';

  constructor(private projectModuleService: ProjectModuleService) {
    this.projectModuleService.initProjectModule({
      name: 'rss',
      translation: true,
      menuItem: {
        title: 'RSS.MENU',
        icon: 'logo-rss',
        position: 50,
        path: RssPageModule.path
      }
    });
  }
 }
