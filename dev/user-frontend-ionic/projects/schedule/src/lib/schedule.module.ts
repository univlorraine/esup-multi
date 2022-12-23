import { CommonModule } from '@angular/common';
import { APP_INITIALIZER, NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FullCalendarModule } from '@fullcalendar/angular'; // must go before plugins
import { IonicModule } from '@ionic/angular';
import { TranslateModule } from '@ngx-translate/core';
import { ProjectModuleService } from '@ul/shared';
import { EventDetailComponent } from './common/event-detail/event-detail.component';
import { CompleteLocalDatePipe } from './common/pipe/complete-local-date.pipe';
import { LocalHourPipe } from './common/pipe/local-hour.pipe';
import { ShortenedDatePipe } from './common/pipe/shortened-date.pipe';
import { SelectPlanningComponent } from './common/select-planning/select-planning.component';
import { CalendarEventComponent } from './schedule-calendar/calendar-event/calendar-event.component';
import { ScheduleCalendarComponent } from './schedule-calendar/schedule-calendar.component';
import { ScheduleListPage } from './schedule-list/schedule-list.page';
import { SchedulePageRoutingModule } from './schedule-routing.module';
import { SchedulePage } from './schedule.page';

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
        roles: ['student', 'staff', 'teacher', 'phd-student', 'CE', 'DC'],
        type: 'ALLOW',
      }
    }]
  });

@NgModule({
  declarations: [
    SchedulePage,
    ScheduleListPage,
    ScheduleCalendarComponent,
    CompleteLocalDatePipe,
    LocalHourPipe,
    ShortenedDatePipe,
    EventDetailComponent,
    SelectPlanningComponent,
    CalendarEventComponent
  ],
  imports: [
    CommonModule,
    IonicModule,
    SchedulePageRoutingModule,
    TranslateModule,
    FormsModule,
    ReactiveFormsModule,
    FullCalendarModule,
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
