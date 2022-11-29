import { CommonModule } from '@angular/common';
import { APP_INITIALIZER, NgModule } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { TranslateModule } from '@ngx-translate/core';
import { ProjectModuleService } from '@ul/shared';
import { QRCodeModule } from 'angularx-qrcode';
import { CardPage } from './card/card.page';
import { CardsRoutingModule } from './cards-routing.module';
import { CardsPage } from './cards.page';
import { EuStudentCardComponent } from './eu-student-card/eu-student-card.component';
import { StaffCardComponent } from './staff-card/staff-card.component';
import { StudentCardComponent } from './student-card/student-card.component';

const initModule = (projectModuleService: ProjectModuleService) =>
  () => projectModuleService.initProjectModule({
    name: 'cards',
    translation: true,
    tileItems: [{
      title: 'CARDS.TILE_STUDENT.TITLE',
      icon: 'card',
      position: 40,
      path: CardsPageModule.path,
      description: 'CARDS.TILE_STUDENT.DESCRIPTION',
      roles: ['student']
    },
    {
      title: 'CARDS.TILE_STAFF.TITLE',
      icon: 'card',
      position: 40,
      path: CardsPageModule.path,
      description: 'CARDS.TILE_STAFF.DESCRIPTION',
      roles: ['staff', 'teacher', 'phd-student', 'CE', 'DC']
    }]
  });

@NgModule({
  imports: [
    CommonModule,
    IonicModule,
    CardsRoutingModule,
    TranslateModule,
    QRCodeModule
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

