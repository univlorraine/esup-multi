import { CommonModule } from '@angular/common';
import { APP_INITIALIZER, NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { EffectsNgModule } from '@ngneat/effects-ng';
import { TranslateModule } from '@ngx-translate/core';
import { ProjectModuleService } from '@ul/shared';
import { ServiceComponent } from './pages/services/service/service.component';
import { ServicesPage } from './pages/services/services.page';
import { WidgetAppComponent } from './pages/widgets/widget/widget-app/widget-app.component';
import { WidgetInfoComponent } from './pages/widgets/widget/widget-info/widget-info.component';
import { WidgetComponent } from './pages/widgets/widget/widget.component';
import { WidgetsPage } from './pages/widgets/widgets.page';
import { TilesRoutingModule } from './tiles-routing.module';
import { TilesEffects } from './tiles.effects';

const initModule = (projectModuleService: ProjectModuleService) =>
  () => projectModuleService.initProjectModule({
    name: 'tiles',
    translation: true,
    menuItems: [{
      title: 'TILES.MENU.WIDGETS',
      icon: 'home',
      position: -1000,
      routerLink: `${TilesModule.routerLink}/widgets`,
      type: 'tabs:start',
    },{
      title: 'TILES.MENU.SERVICES',
      icon: 'apps-sharp',
      position: -900,
      routerLink: `${TilesModule.routerLink}/services`,
      type: 'tabs:start',
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
  static routerLink = '/tiles';
}
