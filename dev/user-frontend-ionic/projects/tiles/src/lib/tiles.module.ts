import { CommonModule } from '@angular/common';
import { APP_INITIALIZER, NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { TilesRoutingModule } from './tiles-routing.module';
import { ProjectModuleService } from '@ul/shared';
import { ServicesPage } from './pages/services/services.page';
import { WidgetsPage } from './pages/widgets/widgets.page';
import { TranslateModule } from '@ngx-translate/core';
import { WidgetComponent } from './pages/widgets/widget/widget.component';
import { WidgetAppComponent } from './pages/widgets/widget/widget-app/widget-app.component';
import { WidgetInfoComponent } from './pages/widgets/widget/widget-info/widget-info.component';
import { EffectsNgModule } from '@ngneat/effects-ng';
import { TilesEffects } from './tiles.effects';
import { ServiceComponent } from './pages/services/service/service.component';
import { ServiceAppComponent } from './pages/services/service/service-app/service-app.component';
import { ServiceInfoComponent } from './pages/services/service/service-info/service-info.component';

const initModule = (projectModuleService: ProjectModuleService) =>
  () => projectModuleService.initProjectModule({
    name: 'tiles',
    translation: true,
    menuItems: [{
      title: 'TILES.MENU.WIDGETS',
      icon: 'home',
      position: -1000,
      path: `${TilesModule.path}/widgets`
    },{
      title: 'TILES.MENU.SERVICES',
      icon: 'apps-sharp',
      position: -900,
      path: `${TilesModule.path}/services`
    }]
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
  declarations: [
    WidgetComponent,
    WidgetAppComponent,
    WidgetInfoComponent,
    WidgetsPage,
    ServiceComponent,
    ServiceAppComponent,
    ServiceInfoComponent,
    ServicesPage,
  ],
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
