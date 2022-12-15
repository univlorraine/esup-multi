import { CommonModule } from '@angular/common';
import { APP_INITIALIZER, NgModule } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { TranslateModule } from '@ngx-translate/core';
import { ProjectModuleService } from '@ul/shared';
import { CompleteLocalDatePipe } from './common/pipe/complete-local-date.pipe';
import { LocalHourPipe } from './common/pipe/local-hour.pipe';
import { EventDetailComponent } from './common/event-detail/event-detail.component';
import { ScheduleListPage } from './schedule-list/schedule-list.page';
import { SchedulePageRoutingModule } from './schedule-routing.module';
import { ShortenedDatePipe } from "./common/pipe/shortened-date.pipe";

const initModule = (projectModuleService: ProjectModuleService) =>
  () => projectModuleService.initProjectModule({
    name: 'schedule',
    translation: true,
    tiles: [{
      title: 'SCHEDULE.MENU',
      icon: 'calendar',
      position: 50,
      path: ScheduleModule.path,
      description: 'SCHEDULE.DESCRIPTION',
      authorization: {
        roles: ['student','staff', 'teacher', 'phd-student', 'CE', 'DC'],
        type: 'ALLOW',
      }
    }]
  });

@NgModule({
  declarations: [
    ScheduleListPage,
    CompleteLocalDatePipe,
    LocalHourPipe,
    ShortenedDatePipe,
    EventDetailComponent
  ],
  imports: [
    CommonModule,
    IonicModule,
    SchedulePageRoutingModule,
    TranslateModule
  ],
  providers: [{
    provide: APP_INITIALIZER,
    useFactory: initModule,
    deps: [ProjectModuleService],
    multi: true
  },
  CompleteLocalDatePipe
],
})
export class ScheduleModule {
  static path = 'schedule';
}
