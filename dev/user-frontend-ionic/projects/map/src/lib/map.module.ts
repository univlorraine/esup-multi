import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { TranslateModule } from '@ngx-translate/core';
import { ProjectModuleService } from '@ul/shared';
import { MapRoutingModule } from './map-routing.module';
import { MapPage } from './map.page';





@NgModule({
  imports: [
    CommonModule,
    IonicModule,
    MapRoutingModule,
    TranslateModule,
  ],
  declarations: [MapPage]
})
export class MapModule {
  static path = 'map';

  constructor(private projectModuleService: ProjectModuleService) {
    this.projectModuleService.initProjectModule({
      name: 'map',
      translation: true,
      tileItems: [{
        title: 'MAP.TILE.TITLE',
        icon: 'map',
        position: 60,
        path: MapModule.path,
        description : 'MAP.TILE.DESCRIPTION',
      }]
    });
  }
}
