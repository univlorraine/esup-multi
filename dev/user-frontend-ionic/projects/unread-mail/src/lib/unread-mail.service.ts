import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { getAuthToken, NetworkService } from '@ul/shared';
import { filter, first, Observable } from 'rxjs';
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
    private networkService: NetworkService
  ) { }

  public loadUnreadMailIfNetworkAvailable(): Observable<void> {
    return this.networkService.isOnline$.pipe(
      first(),
      filter(isOnline => isOnline),
      switchMap(() => this.getAndStoreMailStats()),
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
