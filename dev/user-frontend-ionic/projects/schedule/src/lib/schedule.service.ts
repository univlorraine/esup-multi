import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { getAuthToken, NetworkService } from '@ul/shared';
import { add, format, startOfWeek, sub } from 'date-fns';
import { BehaviorSubject, combineLatest, from, Observable, of, Subject } from 'rxjs';
import { filter, finalize, map, mergeMap, switchMap, take, tap } from 'rxjs/operators';
import { ScheduleModuleConfig, SCHEDULE_CONFIG } from './schedule.config';
import {
  Event,
  HiddenCourse,
  impersonatedScheduleStoreManager,
  Schedule,
  ScheduleStoreManager,
  scheduleStoreManager
} from './schedule.repository';

export const formatDay = (date: Date) => format(date, 'yyyy-MM-dd');

@Injectable({
  providedIn: 'root'
})
export class ScheduleService {

  public isLoading$: Observable<boolean>;
  public hideEventEvt = new Subject();
  public asUser: BehaviorSubject<string> = new BehaviorSubject<string | null>(null);
  private storeManager: ScheduleStoreManager = scheduleStoreManager;
  private isLoadingSubject = new Subject<boolean>();

  constructor(
    @Inject('environment')
    private environment: any,
    private http: HttpClient,
    @Inject(SCHEDULE_CONFIG) private config: ScheduleModuleConfig,
    private networkService: NetworkService,
  ) {
    this.isLoading$ = this.isLoadingSubject.asObservable();
    this.asUser.subscribe(() => {
      this.storeManager = this.getStoreManager();
    });
  }

  public getStoreManager(): ScheduleStoreManager {
    return this.asUser.value ? impersonatedScheduleStoreManager : scheduleStoreManager;
  }

  public getSchedule(authToken: string, startDate: string, endDate: string): Observable<Schedule> {

    const url = `${this.environment.apiEndpoint}/schedule`;
    const data = {
      authToken,
      startDate,
      endDate,
      asUser: this.asUser.value
    };

    return this.http.post<Schedule>(url, data);
  }

  loadSchedule(startDate: string, endDate: string): Observable<Schedule> {

    return from(this.networkService.getConnectionStatus()).pipe(
      filter(status => status.connected),
      tap(() => this.isLoadingSubject.next(true)),
      mergeMap(() => getAuthToken().pipe(
        take(1),
        filter(authToken => authToken != null),
        switchMap(authToken =>
          this.getSchedule(
            authToken,
            startDate,
            endDate
          )
        )
      )),
      finalize(() => this.isLoadingSubject.next(false))
    );
  }

  loadScheduleToState(): Observable<Schedule> {
    return this.loadSchedule(formatDay(this.getStateStartDate()), formatDay(this.getStateEndDate())).pipe(
      tap(schedule => this.storeManager.setSchedule(schedule))
    );
  }

  loadScheduleOutOfStateInterval(startDate: string, endDate: string): Observable<Schedule> {
    return this.loadSchedule(startDate, endDate);
  }

  getStateStartDate(): Date {
    return sub(this.getStartOfCurrentWeek(), { weeks: this.config.previousWeeksInCache });
  }

  getStateEndDate(): Date {
    return add(this.getStartOfCurrentWeek(), { weeks: this.config.nextWeeksInCache });
  }

  getStartOfCurrentWeek(): Date {
    const now = new Date();
    return startOfWeek(now);
  }

  outOfStateScheduleToDisplayedEvents(schedule: Schedule): Observable<Event[]> {
    if (!schedule) {
       return of([]);
    }
    const eventIds = [];
    return combineLatest([this.storeManager.activePlanningIds$, this.storeManager.hiddenCourseList$]).pipe(
      map(([activePlanningIds, hiddenCourseList]: [string[], HiddenCourse[]]) =>
        schedule.plannings.filter(planning => activePlanningIds.includes(planning.id))
          .reduce((events, planning) => {
            planning.events.forEach(event => {
              if (!eventIds.includes(event.id)) {
                eventIds.push(event.id);
                events.push(event);
              }
            });
            return events;
          }, [])
          .sort((a: Event, b: Event) => new Date(a.startDateTime).getTime() - new Date(b.startDateTime).getTime())
          .filter((event: Event) => !hiddenCourseList.some(hiddenCourse => hiddenCourse.id === event.course.id)
          )),
    );
  }

  emitHideCourseEvt() {
    this.hideEventEvt.next();
  }

  setAsUser(asUser: string) {
    this.asUser.next(asUser);
  }
}
