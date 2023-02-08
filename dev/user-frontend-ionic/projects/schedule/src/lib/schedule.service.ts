import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { Network } from '@capacitor/network';
import { getAuthToken } from '@ul/shared';
import { add, format, startOfMonth, startOfToday, startOfWeek, sub } from 'date-fns';
import { combineLatest, from, Observable, Subject } from 'rxjs';
import { filter, finalize, first, map, mergeMap, switchMap, tap } from 'rxjs/operators';
import { ScheduleModuleConfig, SCHEDULE_CONFIG } from './schedule.config';
import { activePlanningIds$, Event, hiddenCourseList$, Schedule, setSchedule } from './schedule.repository';

export const formatDay = (date: Date) => format(date, 'yyyy-MM-dd');

@Injectable({
  providedIn: 'root'
})
export class ScheduleService {

  public isLoading$: Observable<boolean>;
  public hideEventEvt = new Subject();
  private isLoadingSubject = new Subject<boolean>();


  constructor(
    @Inject('environment')
    private environment: any,
    private http: HttpClient,
    @Inject(SCHEDULE_CONFIG) private config: ScheduleModuleConfig
  ) {
    this.isLoading$ = this.isLoadingSubject.asObservable();
  }

  public getSchedule(authToken: string, startDate: string, endDate: string): Observable<Schedule> {

    const url = `${this.environment.apiEndpoint}/schedule`;
    const data = {
      authToken,
      startDate,
      endDate
    };

    return this.http.post<Schedule>(url, data);
  }

  loadSchedule(startDate: string, endDate: string): Observable<Schedule> {

    return from(Network.getStatus()).pipe(
      filter(status => status.connected),
      tap(() => this.isLoadingSubject.next(true)),
      mergeMap(() => getAuthToken().pipe(
        first(),
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
      tap(schedule => setSchedule(schedule))
    );
  }

  loadScheduleOutOfStateInterval(startDate: string, endDate: string): Observable<Schedule> {
    return this.loadSchedule(startDate, endDate);
  }

  getStateStartDate(): Date {
    return sub(this.getStartOfCurrentWeek(), { weeks: this.config.previousWeeksInCache });
  }

  getStateEndDate(): Date {
    const stateEndDate = add(this.getStartOfCurrentWeek(), { weeks: this.config.nextWeeksInCache });
    return sub(stateEndDate, { days: 1 });;
  }

  getStartOfCurrentWeek(): Date {
    const now = new Date();
    return startOfWeek(now);
  }

  outOfStateScheduleToDisplayedEvents(schedule: Schedule): Observable<Event[]> {
    const eventIds = [];
    return combineLatest([activePlanningIds$, hiddenCourseList$]).pipe(
      map(([activPlanningIds, hiddenCourseList]) => schedule.plannings.filter(planning => activPlanningIds.includes(planning.code))
        .reduce((events, planning) => {
          planning.events.forEach(event => {
            /* eslint-disable no-underscore-dangle*/
            // @TODO supprimer la ligne suivante quand l'API de l'UL sera prête.
            event.id = event._adeEventId.toString();
            /* eslint-enable no-underscore-dangle */

            if (!eventIds.includes(event.id)) {
              eventIds.push(event.id);
              events.push(event);
            }
          });
          return events;
        }, [])
        .sort((a: Event, b: Event) => new Date(a.startDateTime).getTime() - new Date(b.startDateTime).getTime())
        .filter((event: Event) => {
          // @TODO supprimer la ligne suivante quand l'API de l'UL sera prête.
          event.course.id = event.course.code;

          return !hiddenCourseList.some(hiddenCourse => hiddenCourse.id === event.course.id);
        }
        )),
    );
  }

  emitHideCourseEvt() {
    this.hideEventEvt.next();
  }
}
