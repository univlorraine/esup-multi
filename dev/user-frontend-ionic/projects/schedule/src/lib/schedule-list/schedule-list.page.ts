import { Component,ViewChild } from '@angular/core';
import { Network } from '@capacitor/network';
import { IonContent } from '@ionic/angular';
import { AuthenticatedUser, authenticatedUser$ } from '@ul/shared';
import { add, startOfWeek } from 'date-fns';
import { Observable } from 'rxjs';
import { filter, finalize, first, map, switchMap, tap } from 'rxjs/operators';
import { Schedule, schedule$, setSchedule } from '../schedule.repository';
import { ScheduleService } from '../schedule.service';
import { EventsByDay, formatDay, ScheduleListService } from './schedule-list.service';

@Component({
  selector: 'app-schedule-list',
  templateUrl: './schedule-list.page.html',
  styleUrls: ['./schedule-list.page.scss'],
})
export class ScheduleListPage {

  @ViewChild('scrollContent') content: IonContent;


  public authenticatedUser$: Observable<AuthenticatedUser>;
  public schedule$: Observable<Schedule> = schedule$;
  public areEventInPlannings$: Observable<boolean>;
  public isLoading = false;
  public eventsByDays: EventsByDay[];
  public eventsByDays$: Observable<EventsByDay[]>;
  public currentDay: string;
  public startDate: Date;
  public endDate: Date;

  constructor(
    private scheduleService: ScheduleService,
    private scheduleListService: ScheduleListService,
  ) {
    this.areEventInPlannings$ = schedule$.pipe(map(schedule => {
      if (schedule) { return schedule.plannings.some(planning => planning.events.length > 0); }
    }));
  }

  ionViewWillEnter() {
    this.currentDay = formatDay(new Date());
    this.startDate = startOfWeek(new Date(), { weekStartsOn: 1 });
    this.endDate = add(this.startDate, { days: 27 });

    this.loadSchedule().then(() => {
      setTimeout(() => {
        this.scrollToCurrentDate();
      }, 300);
    });

    this.eventsByDays$ = schedule$.pipe(map(schedule => {
      const dateInterval = {start: this.startDate, end: this.endDate};
      return this.scheduleListService.scheduleToEventsByDay(schedule, dateInterval);
    }));
  }

  scrollToCurrentDate() {
    const element = document.getElementById(this.currentDay);
    if (!element) {
      return;
    }

    const y = element.offsetTop;
    this.content.scrollToPoint(0, y);
  }

  private async loadSchedule() {
    if (!(await Network.getStatus()).connected) {
      return;
    }

    this.isLoading = true;
    return authenticatedUser$.pipe(
      first(),
      filter(authenticatedUser => authenticatedUser != null),
      switchMap(authenticatedUser =>
        this.scheduleService .getSchedule(
          authenticatedUser.authToken,
          formatDay(this.startDate),
          formatDay(this.endDate)
        )
      ),
      tap(schedule => setSchedule(schedule)),
      finalize(() => this.isLoading = false)
    ).toPromise();
  }

}
