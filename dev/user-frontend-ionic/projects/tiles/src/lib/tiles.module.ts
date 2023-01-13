import { CommonModule } from '@angular/common';
import { APP_INITIALIZER, NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { TilesRoutingModule } from './tiles-routing.module';
import { ProjectModuleService } from '@ul/shared';
import { TilesPage } from './tiles.page';
import { TranslateModule } from '@ngx-translate/core';
import { TileComponent } from './tile/tile.component';
import { TileAppComponent } from './tile/tile-app/tile-app.component';
import { TileInfoComponent } from './tile/tile-info/tile-info.component';
import { EffectsNgModule } from '@ngneat/effects-ng';
import { TilesEffects } from './tiles.effects';

const initModule = (projectModuleService: ProjectModuleService) =>
  () => projectModuleService.initProjectModule({
    name: 'tiles',
    translation: true,
    menuItem: {
      title: 'TILES.MENU',
      icon: 'apps-sharp',
      position: -1000,
      path: TilesModule.path
    }
  });

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TilesRoutingModule,
    TranslateModule,
    EffectsNgModule.forFeature([TilesEffects]),
  ],
  declarations: [TileComponent, TileAppComponent, TileInfoComponent, TilesPage],
  providers: [{
    provide: APP_INITIALIZER,
    useFactory: initModule,
    deps:[ProjectModuleService],
    multi: true
  }],
})
export class TilesModule {
  static path = 'tiles';
}
