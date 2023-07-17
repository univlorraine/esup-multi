import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { Network } from '@capacitor/network';
import { getAuthToken } from '@ul/shared';
import { from, iif, Observable, of } from 'rxjs';
import { map, switchMap, take, tap } from 'rxjs/operators';
import { MailCalendar, setMails } from './unread-mail.repository';

@Injectable({
  providedIn: 'root'
})
export class UnreadMailService {
  constructor(
    @Inject('environment')
    private environment: any,
    private http: HttpClient,
  ) { }

  public loadUnreadMailIfNetworkAvailable(): Observable<void> {
    return from(Network.getStatus()).pipe(
      switchMap(status => iif(
        () => status.connected,
        this.getAndStoreMailStats(),
        of(null),
      )),
    );
  }

  private getMailCalendar(): Observable<MailCalendar> {
    const url = `${this.environment.apiEndpoint}/mail-calendar`;
    return getAuthToken().pipe(
      take(1),
      switchMap(authToken => this.http.post<MailCalendar>(url, { authToken }))
    );
  }

  private getAndStoreMailStats(): Observable<void> {
    return this.getMailCalendar().pipe(
      tap(setMails),
      map(() => null)
    );
  }
}
