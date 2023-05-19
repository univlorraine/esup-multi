import { CommonModule } from '@angular/common';
import { APP_INITIALIZER, NgModule } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { ProjectModuleService, SharedComponentsModule } from '@ul/shared';
import { RestaurantsPage } from './restaurants.page';
import { RestaurantsRoutingModule } from './restaurants-routing.module';
import { TranslateModule } from '@ngx-translate/core';

const initModule = (projectModuleService: ProjectModuleService) =>
  () => projectModuleService.initProjectModule({
    name: 'restaurants',
    translation: true,
});

@NgModule({
  declarations: [
    RestaurantsPage
  ],
  imports: [
    CommonModule,
    IonicModule,
    RestaurantsRoutingModule,
    TranslateModule,
    SharedComponentsModule
  ],
  providers: [{
    provide: APP_INITIALIZER,
    useFactory: initModule,
    deps: [
      ProjectModuleService,
    ],
    multi: true
  }]
})
export class RestaurantsModule {
  static routerLink = '/restaurants';
 }
