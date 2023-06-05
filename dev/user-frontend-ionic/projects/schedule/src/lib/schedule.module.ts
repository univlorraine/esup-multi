import { CommonModule } from '@angular/common';
import { APP_INITIALIZER, ModuleWithProviders, NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FullCalendarModule } from '@fullcalendar/angular'; // must go before plugins
import { IonicModule } from '@ionic/angular';
import { TranslateModule } from '@ngx-translate/core';
import { CompleteLocalDatePipe, ProjectModuleService, SharedComponentsModule, SharedPipeModule } from '@ul/shared';
import { EventDetailComponent } from './common/event-detail/event-detail.component';
import { LocalHourPipe } from './common/pipe/local-hour.pipe';
import { ShortenedDatePipe } from './common/pipe/shortened-date.pipe';
import { HiddenCourseComponent } from './common/select-planning/hidden-course/hidden-course.component';
import { SelectPlanningComponent } from './common/select-planning/select-planning.component';
import { CalendarEventComponent } from './schedule-calendar/calendar-event/calendar-event.component';
import { ScheduleCalendarComponent } from './schedule-calendar/schedule-calendar.component';
import { ScheduleListPage } from './schedule-list/schedule-list.page';
import { SchedulePageRoutingModule } from './schedule-routing.module';
import { ScheduleModuleConfig, SCHEDULE_CONFIG } from './schedule.config';
import { SchedulePage } from './schedule.page';
import { NextEventsComponent } from './widgets/next-events/next-events.component';

const initModule = (projectModuleService: ProjectModuleService) =>
  () => projectModuleService.initProjectModule({
    name: 'schedule',
    translation: true,
    widgets: [{
      id: 'next-events',
      component: NextEventsComponent,
    }],
    historyBlacklist: [
      '/schedule/calendar#day',
      '/schedule/calendar#week',
      '/schedule/calendar#month',
    ]
  });

@NgModule({
  declarations: [
    SchedulePage,
    ScheduleListPage,
    ScheduleCalendarComponent,
    LocalHourPipe,
    ShortenedDatePipe,
    EventDetailComponent,
    SelectPlanningComponent,
    CalendarEventComponent,
    HiddenCourseComponent,
    NextEventsComponent
  ],
  imports: [
    CommonModule,
    IonicModule,
    SchedulePageRoutingModule,
    TranslateModule,
    FormsModule,
    ReactiveFormsModule,
    FullCalendarModule,
    SharedComponentsModule,
    SharedPipeModule
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
  static routerLink = '/schedule';

  static forRoot(config: ScheduleModuleConfig): ModuleWithProviders<ScheduleModule> {
    return {
      ngModule: ScheduleModule,
      providers: [
        { provide: SCHEDULE_CONFIG, useValue: config }
      ]
    };
  }
}
