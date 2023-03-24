import { CommonModule } from '@angular/common';
import { APP_INITIALIZER, ModuleWithProviders, NgModule } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { TranslateModule } from '@ngx-translate/core';
import { ProjectModuleService, SharedComponentsModule } from '@ul/shared';
import { ReservationRoutingModule } from './reservation-routing.module';
import { ReservationModuleConfig, RESERVATION_CONFIG } from './reservation.config';
import { ReservationPage } from './reservation.page';
import { QRScanPage } from './scan/scan.page';

const initModule = (projectModuleService: ProjectModuleService) =>
  () => projectModuleService.initProjectModule({
    name: 'reservation',
    translation: true,
  });

@NgModule({
  declarations: [
    ReservationPage,
    QRScanPage,
  ],
  imports: [
    CommonModule,
    IonicModule,
    ReservationRoutingModule,
    TranslateModule,
    SharedComponentsModule
  ],
  providers: [{
    provide: APP_INITIALIZER,
    useFactory: initModule,
    deps: [ProjectModuleService],
    multi: true
  }]
})
export class ReservationModule {

  static routerLink = '/reservation';

  static forRoot(config: ReservationModuleConfig): ModuleWithProviders<ReservationModule> {
    return {
      ngModule: ReservationModule,
      providers: [
        { provide: RESERVATION_CONFIG, useValue: config }
      ]
    };
  }
}
