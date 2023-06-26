import { Component, OnDestroy, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { first } from 'rxjs/operators';
import { ScheduleCalendarComponent } from './schedule-calendar/schedule-calendar.component';
import { ScheduleService } from './schedule.service';
import { impersonatedScheduleStoreManager } from './schedule.repository';

type ViewType = 'month' | 'week' | 'day' | 'list';

const DEFAULT_VIEW_TYPE: ViewType = 'month';

@Component({
  selector: 'app-schedule',
  templateUrl: './schedule.page.html',
  styleUrls: ['./schedule.page.scss'],
})
export class SchedulePage implements OnDestroy {

  @ViewChild(ScheduleCalendarComponent) calendarRef: ScheduleCalendarComponent;
  viewType: ViewType = DEFAULT_VIEW_TYPE;
  public isLoading$ = this.scheduleService.isLoading$;
  public asUser: string;

  constructor(
    private scheduleService: ScheduleService,
    private router: Router) { }

  onViewTypeChange(evt) {
    this.viewType = evt.detail.value;
  }

  ionViewDidEnter() {
    this.calendarRef?.initCalendar();
    this.scheduleService.loadScheduleToState().pipe(first()).subscribe();
    this.scheduleService.asUser.subscribe((asUser) => this.asUser = asUser);
  }

  ngOnDestroy() {
    this.clearAsUserLogin();
  }

  isTabActive(anchor: string): boolean {
    return this.router.routerState.snapshot.url.includes(anchor);
  }

  clearAsUserLogin() {
    this.asUser = null;
    this.scheduleService.setAsUser(null);
    impersonatedScheduleStoreManager.resetStore();
  }
}
