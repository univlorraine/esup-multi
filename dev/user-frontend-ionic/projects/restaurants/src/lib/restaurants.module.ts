import { CommonModule } from '@angular/common';
import { APP_INITIALIZER, NgModule } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { TranslateModule } from '@ngx-translate/core';
import { ProjectModuleService, SharedComponentsModule, SharedPipeModule } from '@ul/shared';
import { RestaurantMenusPage } from './restaurant-menus-page/restaurant-menus.page';
import { RestaurantsRoutingModule } from './restaurants-routing.module';
import { RestaurantsPage } from './restaurants.page';

const initModule = (projectModuleService: ProjectModuleService) =>
  () => projectModuleService.initProjectModule({
    name: 'restaurants',
    translation: true,
  });

@NgModule({
  declarations: [
    RestaurantsPage,
    RestaurantMenusPage
  ],
  providers: [{
    provide: APP_INITIALIZER,
    useFactory: initModule,
    deps: [
      ProjectModuleService,
    ],
    multi: true
  }],
  imports: [
    CommonModule,
    IonicModule,
    RestaurantsRoutingModule,
    TranslateModule,
    SharedComponentsModule,
    SharedPipeModule
  ]
})
export class RestaurantsModule {
  static routerLink = '/restaurants';
}
