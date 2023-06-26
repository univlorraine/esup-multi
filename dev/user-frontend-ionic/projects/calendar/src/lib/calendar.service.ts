import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { Network } from '@capacitor/network';
import { getAuthToken } from '@ul/shared';
import { isAfter } from 'date-fns';
import { from, iif, Observable, of } from 'rxjs';
import { first, map, switchMap, tap } from 'rxjs/operators';
import { CalendarModuleConfig, CALENDAR_CONFIG } from './calendar.config';
import { events$, MailCalendar, setEvents } from './calendar.repository';

@Injectable({
  providedIn: 'root'
})
export class CalendarService {

  constructor(
    @Inject(CALENDAR_CONFIG) private config: CalendarModuleConfig,
    @Inject('environment')
    private environment: any,
    private http: HttpClient
  ) { }

  public loadCalendarIfNetworkAvailable(): Observable<void> {
    return from(Network.getStatus()).pipe(
      switchMap(status => iif(
        () => status.connected,
        this.getAndStoreCalendarEvents(),
        of(null),
      )),
    );
  }

  public getNextEvents$() {
    return events$.pipe(
      map(events => {
        const startDate = new Date();

        return events
          .filter(event => isAfter(new Date(event.endDateTime), startDate))
          .sort((evtA, evtB) => new Date(evtA.startDateTime).getTime() - new Date(evtB.startDateTime).getTime())
          .slice(0, this.config.numberOfEventsLimit);
      })
    );
  }

  private getMailCalendar(): Observable<MailCalendar> {
    const url = `${this.environment.apiEndpoint}/mail-calendar`;
    return getAuthToken().pipe(
      first(),
      switchMap(authToken => this.http.post<MailCalendar>(url, { authToken }))
    );
  }

  private getAndStoreCalendarEvents(): Observable<void> {
    return this.getMailCalendar().pipe(
      tap(mailCalendar => setEvents(mailCalendar.events)),
      map(() => null)
    );
  }
}