import { Component, ViewChild } from '@angular/core';
import { IonContent } from '@ionic/angular';
import { AuthenticatedUser } from '@ul/shared';
import { add, isAfter, startOfWeek } from 'date-fns';
import { Observable, Subscription } from 'rxjs';
import { map } from 'rxjs/operators';
import { eventsFromActivePlannings$, Schedule, schedule$ } from '../schedule.repository';
import { formatDay, ScheduleService } from '../schedule.service';
import { EventsByDay, ScheduleListService } from './schedule-list.service';

@Component({
  selector: 'app-schedule-list',
  templateUrl: './schedule-list.page.html',
  styleUrls: ['./schedule-list.page.scss'],
})
export class ScheduleListPage {

  @ViewChild('scrollContent') content: IonContent;

  public authenticatedUser$: Observable<AuthenticatedUser>;
  public schedule$: Observable<Schedule> = schedule$;
  public areEventsFromActivePlannings$: Observable<boolean>;
  public eventsByDays$: Observable<EventsByDay[]>;
  public currentDay: string;
  public viewStartDate: Date;
  public viewEndDate: Date;
  private subscriptions: Subscription[] = [];

  constructor(
    private scheduleListService: ScheduleListService,
    private scheduleService: ScheduleService,
  ) {
    this.areEventsFromActivePlannings$ = eventsFromActivePlannings$.pipe(map(eventList => eventList.length > 0));
  }

  async ionViewWillEnter() {
    const now = new Date();
    this.currentDay = formatDay(now);
    this.viewStartDate = startOfWeek(now, { weekStartsOn: 1 });
    this.viewEndDate = add(this.viewStartDate, { days: 27 });

    this.subscriptions.push(schedule$.subscribe(() => {
      setTimeout(() => {
        this.scrollToCurrentDate();
      }, 300);
    }));

    this.eventsByDays$ = this.scheduleListService.loadEventsByDays(this.viewStartDate, this.viewEndDate);

    this.subscriptions.push(this.scheduleListService.showEventEvt.subscribe(() => {
      this.keepScrollPosition();
    }));

    this.subscriptions.push(this.scheduleService.hideEventEvt.subscribe(() => {
      this.keepScrollPosition();
    }));
  }

  ionViewWillLeave() {
    this.subscriptions?.forEach(subscription => subscription.unsubscribe());
  }

  scrollToCurrentDate() {
    const element = document.getElementById(this.currentDay);
    if (!element) {
      return;
    }

    const y = element.offsetTop;
    this.content.scrollToPoint(0, y);
  }

  async keepScrollPosition(scrollPosition?: number) {
    if (!scrollPosition) {
      scrollPosition = (await this.content.getScrollElement()).scrollTop;
    }
    setTimeout(() => {
      this.content.scrollToPoint(0, scrollPosition);
    }, 0);
  }

  async loadMoreEvents() {
    const endDateToLoad = add(this.viewEndDate, { days: 27 });
    const scrollPosition = (await this.content.getScrollElement()).scrollTop;

    let outOfStateSchedule: Schedule;

    if (isAfter(endDateToLoad, this.scheduleService.getStateEndDate())) {
      const nextDateAfterStateEndDate = add(this.scheduleService.getStateEndDate(), { days: 1 });
      outOfStateSchedule = await this.scheduleService
        .loadScheduleOutOfStateInterval(formatDay(nextDateAfterStateEndDate), formatDay(endDateToLoad)).toPromise();
    }

    this.eventsByDays$ = this.scheduleListService.loadEventsByDays(this.viewStartDate, endDateToLoad, outOfStateSchedule);

    this.keepScrollPosition(scrollPosition);
    this.viewEndDate = endDateToLoad;

  }
}
