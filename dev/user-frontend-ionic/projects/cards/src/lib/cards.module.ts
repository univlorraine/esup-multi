import { CommonModule } from '@angular/common';
import { APP_INITIALIZER, NgModule } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { EffectsNgModule } from '@ngneat/effects-ng';
import { TranslateModule } from '@ngx-translate/core';
import { ProjectModuleService } from '@ul/shared';
import { QRCodeModule } from 'angularx-qrcode';
import { CardPage } from './card/card.page';
import { CardsRoutingModule } from './cards-routing.module';
import { CardsEffects } from './cards.effects';
import { CardsPage } from './cards.page';
import { EuStudentCardComponent } from './eu-student-card/eu-student-card.component';
import { StaffCardComponent } from './staff-card/staff-card.component';
import { StudentCardComponent } from './student-card/student-card.component';

const initModule = (projectModuleService: ProjectModuleService) =>
  () => projectModuleService.initProjectModule({
    name: 'cards',
    translation: true,
  });

@NgModule({
  imports: [
    CommonModule,
    IonicModule,
    CardsRoutingModule,
    TranslateModule,
    QRCodeModule,
    EffectsNgModule.forFeature([CardsEffects]),
  ],
  declarations: [
    CardsPage,
    StudentCardComponent,
    EuStudentCardComponent,
    StaffCardComponent,
    CardPage
  ],
  providers: [{
    provide: APP_INITIALIZER,
    useFactory: initModule,
    deps:[ProjectModuleService],
    multi: true
  }],
})

export class CardsPageModule {
  static path = 'cards';
}

