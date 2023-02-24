import { CommonModule } from '@angular/common';
import { APP_INITIALIZER, ModuleWithProviders, NgModule } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { TranslateModule } from '@ngx-translate/core';
import { ProjectModuleService } from '@ul/shared';
import { ReservationRoutingModule } from './reservation-routing.module';
import { ReservationModuleConfig, RESERVATION_CONFIG } from './reservation.config';
import { ReservationPage } from './reservation.page';

const initModule = (projectModuleService: ProjectModuleService) =>
  () => projectModuleService.initProjectModule({
    name: 'reservation',
    translation: true
  });

@NgModule({
  declarations: [ReservationPage],
  imports: [
    CommonModule,
    IonicModule,
    ReservationRoutingModule,
    TranslateModule
  ],
  providers: [{
    provide: APP_INITIALIZER,
    useFactory: initModule,
    deps: [ProjectModuleService],
    multi: true
  }]
})
export class ReservationModule {

  static path = 'reservation';

  static forRoot(config: ReservationModuleConfig): ModuleWithProviders<ReservationModule> {
    return {
      ngModule: ReservationModule,
      providers: [
        { provide: RESERVATION_CONFIG, useValue: config }
      ]
    };
  }
}
