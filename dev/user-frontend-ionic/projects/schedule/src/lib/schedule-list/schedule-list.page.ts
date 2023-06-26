import { Component, ViewChild } from '@angular/core';
import { IonContent } from '@ionic/angular';
import { AuthenticatedUser } from '@ul/shared';
import { add, isAfter, startOfWeek } from 'date-fns';
import { combineLatest, Observable, of, Subscription } from 'rxjs';
import { map, switchMap, tap } from 'rxjs/operators';
import {
  impersonatedScheduleStoreManager,
  Schedule,
  scheduleStoreManager,
  ScheduleStoreManager
} from '../schedule.repository';
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
  public areEventsFromActivePlannings$: Observable<boolean>;
  public eventsByDays$: Observable<EventsByDay[]>;
  public currentDay: string;
  public viewStartDate: Date;
  public viewEndDate: Date;
  public storeManager: ScheduleStoreManager = scheduleStoreManager;
  private subscriptions: Subscription[] = [];

  constructor(
    private scheduleListService: ScheduleListService,
    private scheduleService: ScheduleService,
  ) { }

  async ionViewWillEnter() {
    const now = new Date();
    this.currentDay = formatDay(now);
    this.viewStartDate = startOfWeek(now, { weekStartsOn: 1 });
    this.viewEndDate = this.scheduleService.getStateEndDate();

    this.subscriptions.push(
      this.scheduleService.asUser.pipe(
        tap(() => this.storeManager = this.scheduleService.getStoreManager()),
        switchMap(() => this.storeManager.eventsFromActivePlannings$),
        map(eventList => eventList.length > 0)
      ).subscribe(result => {
        this.areEventsFromActivePlannings$ = of(result);
        this.eventsByDays$ = this.scheduleListService.loadEventsByDays(this.viewStartDate, this.viewEndDate);
      }),

      combineLatest([
        scheduleStoreManager.schedule$,
        impersonatedScheduleStoreManager.schedule$,
        this.scheduleService.asUser
      ]).subscribe(() => {
        setTimeout(() => {
          this.scrollToCurrentDate();
        }, 300);
      })
    );

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
    const endDateToLoad = add(this.viewEndDate, { days: 7 });
    const scrollPosition = (await this.content.getScrollElement()).scrollTop;

    let outOfStateSchedule: Schedule;

    if (isAfter(endDateToLoad, this.scheduleService.getStateEndDate())) {
      const nextDateAfterStateEndDate = add(this.scheduleService.getStateEndDate(), { days: 1 });
      outOfStateSchedule = await this.scheduleService
        .loadScheduleOutOfStateInterval(formatDay(nextDateAfterStateEndDate), formatDay(endDateToLoad)).toPromise();
    }

    this.eventsByDays$ = this.scheduleListService.loadEventsByDays(this.viewStartDate, endDateToLoad, outOfStateSchedule);

    await this.keepScrollPosition(scrollPosition);
    this.viewEndDate = endDateToLoad;

  }
}
