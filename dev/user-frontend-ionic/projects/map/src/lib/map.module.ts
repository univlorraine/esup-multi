import { CommonModule } from '@angular/common';
import { APP_INITIALIZER, ModuleWithProviders, NgModule } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { TranslateModule } from '@ngx-translate/core';
import { ProjectModuleService } from '@ul/shared';
import { MapRoutingModule } from './map-routing.module';
import { MapModuleConfig, MAP_CONFIG } from './map.config';
import { MapPage } from './map.page';

const initModule = (projectModuleService: ProjectModuleService) =>
  () => projectModuleService.initProjectModule({
    name: 'map',
    translation: true
  });

@NgModule({
  imports: [
    CommonModule,
    IonicModule,
    MapRoutingModule,
    TranslateModule,
  ],
  declarations: [MapPage],
  providers: [{
    provide: APP_INITIALIZER,
    useFactory: initModule,
    deps:[ProjectModuleService],
    multi: true
  }],
})
export class MapModule {
  static path = 'map';

  static forRoot(config: MapModuleConfig): ModuleWithProviders<MapModule> {
    return {
      ngModule: MapModule,
      providers: [
        { provide: MAP_CONFIG, useValue: config }
      ]
    };
  }
}
