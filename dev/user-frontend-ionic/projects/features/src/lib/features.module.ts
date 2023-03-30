import { CommonModule } from '@angular/common';
import { APP_INITIALIZER, NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { EffectsNgModule } from '@ngneat/effects-ng';
import { TranslateModule } from '@ngx-translate/core';
import { ProjectModuleService, SharedComponentsModule } from '@ul/shared';
import { ServiceComponent } from './pages/services/service/service.component';
import { ServicesPage } from './pages/services/services.page';
import { WidgetInternalFeatureComponent } from './pages/widgets/widget/widget-internal-feature/widget-internal-feature.component';
import { WidgetExternalFeatureComponent } from './pages/widgets/widget/widget-external-feature/widget-external-feature.component';
import { WidgetComponent } from './pages/widgets/widget/widget.component';
import { WidgetsPage } from './pages/widgets/widgets.page';
import { FeaturesRoutingModule } from './features-routing.module';
import { FeaturesEffects } from './features.effects';

const initModule = (projectModuleService: ProjectModuleService) =>
  () => projectModuleService.initProjectModule({
    name: 'features',
    translation: true,
    menuItems: [{
      title: 'FEATURES.MENU.WIDGETS',
      icon: 'home',
      position: -1000,
      routerLink: `${FeaturesModule.routerLink}/widgets`,
      type: 'tabs:start',
    },{
      title: 'FEATURES.MENU.SERVICES',
      icon: 'apps-sharp',
      position: -900,
      routerLink: `${FeaturesModule.routerLink}/services`,
      type: 'tabs:start',
    }]
  });

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    FeaturesRoutingModule,
    TranslateModule,
    EffectsNgModule.forFeature([FeaturesEffects]),
    SharedComponentsModule,
  ],
  declarations: [
    WidgetComponent,
    WidgetInternalFeatureComponent,
    WidgetExternalFeatureComponent,
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
export class FeaturesModule {
  static routerLink = '/features';
}
