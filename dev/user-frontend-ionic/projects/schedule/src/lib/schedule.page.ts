import { Component, ViewChild } from '@angular/core';
import { ScheduleCalendarComponent } from './schedule-calendar/schedule-calendar.component';

type ViewType = 'month' | 'week' | 'day' | 'list';

const DEFAULT_VIEW_TYPE: ViewType = 'month';

@Component({
  selector: 'app-schedule',
  templateUrl: './schedule.page.html',
  styleUrls: ['./schedule.page.scss'],
})
export class SchedulePage  {

  @ViewChild(ScheduleCalendarComponent) calendarRef: ScheduleCalendarComponent;
  viewType: ViewType = DEFAULT_VIEW_TYPE;

  onViewTypeChange(evt) {
    this.viewType = evt.detail.value;
  }

  ionViewDidEnter() {
    this.calendarRef?.initCalendar();
  }
}
