import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { Network } from '@capacitor/network';
import { authenticatedUser$ } from '@ul/shared';
import { add, format, startOfMonth, sub } from 'date-fns';
import { from, Observable, Subject } from 'rxjs';
import { filter, finalize, first, map, mergeMap, switchMap, tap } from 'rxjs/operators';
import { activePlanningIds$, Planning, Schedule, setSchedule } from './schedule.repository';

export const formatDay = (date: Date) => format(date, 'yyyy-MM-dd');

@Injectable({
  providedIn: 'root'
})
export class ScheduleService {

  public isLoading$: Observable<boolean>;
  private isLoadingSubject = new Subject<boolean>();

  constructor(
    @Inject('environment')
    private environment: any,
    private http: HttpClient,
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
      mergeMap(() => authenticatedUser$.pipe(
        first(),
        filter(authenticatedUser => authenticatedUser != null),
        switchMap(authenticatedUser =>
          this.getSchedule(
            authenticatedUser.authToken,
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
    return sub(this.getStartOfCurrentMonth(), { months: 1 });
  }

  getStateEndDate(): Date {
    const stateEndDate = add(this.getStartOfCurrentMonth(), { months: 3 });
    return sub(stateEndDate, { days: 1 });;
  }

  getStartOfCurrentMonth(): Date {
    const now = new Date();
    return startOfMonth(now);
  }

  filterSelectedPlanningsFromSchedule(schedule: Schedule): Observable<Planning[]> {
    return activePlanningIds$.pipe(
      map(activPlanningIds => schedule.plannings.filter(planning => activPlanningIds.includes(planning.code))
      ));

  }

}
