import { Component, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { first } from 'rxjs/operators';
import { ScheduleCalendarComponent } from './schedule-calendar/schedule-calendar.component';
import { ScheduleService } from './schedule.service';

type ViewType = 'month' | 'week' | 'day' | 'list';

const DEFAULT_VIEW_TYPE: ViewType = 'month';

@Component({
  selector: 'app-schedule',
  templateUrl: './schedule.page.html',
  styleUrls: ['./schedule.page.scss'],
})
export class SchedulePage {

  @ViewChild(ScheduleCalendarComponent) calendarRef: ScheduleCalendarComponent;
  viewType: ViewType = DEFAULT_VIEW_TYPE;
  public isLoading$ = this.scheduleService.isLoading$;

  constructor(
    private scheduleService: ScheduleService,
    private router: Router) { }

  onViewTypeChange(evt) {
    this.viewType = evt.detail.value;
  }

  ionViewDidEnter() {
    this.calendarRef?.initCalendar();
    this.scheduleService.loadScheduleToState().pipe(first()).subscribe();
  }

  isTabActive(anchor: string): boolean {
    return this.router.routerState.snapshot.url.includes(anchor);
  }
}
