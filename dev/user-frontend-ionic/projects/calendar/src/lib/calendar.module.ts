import { APP_INITIALIZER, ModuleWithProviders, NgModule } from '@angular/core';
import { ProjectModuleService } from '@ul/shared';
import { CalendarComponent } from './widget/calendar/calendar.component';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { TranslateModule } from '@ngx-translate/core';
import { LocalDatePipe } from './common/pipe/local-date.pipe';
import { LocalTimePipe } from './common/pipe/local-time.pipe';
import { CALENDAR_CONFIG, CalendarModuleConfig } from './calendar.config';

const initModule = (projectModuleService: ProjectModuleService) =>
  () => projectModuleService.initProjectModule({
    name: 'calendar',
    translation: true,
    widgets: [{
      id: 'calendar',
      component: CalendarComponent,
    }]
  });

@NgModule({
  declarations: [
    CalendarComponent,
    LocalDatePipe,
    LocalTimePipe
  ],
  imports: [
    CommonModule,
    IonicModule,
    TranslateModule
  ],
  providers: [{
    provide: APP_INITIALIZER,
    useFactory: initModule,
    deps:[ProjectModuleService],
    multi: true
  }],
})
export class CalendarModule {
  static forRoot(config: CalendarModuleConfig): ModuleWithProviders<CalendarModule> {
    return {
      ngModule: CalendarModule,
      providers: [
        { provide: CALENDAR_CONFIG, useValue: config }
      ]
    };
  }
}
