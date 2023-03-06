import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { getAuthToken } from '@ul/shared';
import { Observable } from 'rxjs';
import { filter, first, switchMap, tap } from 'rxjs/operators';
import { addNotifications, Channel, Notification, setNotifications, TranslatedChannel } from './notifications.repository';

@Injectable({
  providedIn: 'root'
})
export class NotificationsService {

  constructor(
    @Inject('environment')
    private environment: any,
    private http: HttpClient,
  ) {
  }

  public getNotifications(authToken: string, offset: number, length: number): Observable<Notification[]> {
    const url = `${this.environment.apiEndpoint}/notifications`;
    const data = {
      authToken,
      offset,
      length
    };

    return this.http.post<Notification[]>(url, data);
  }

  public getChannels(): Observable<Channel[]> {
    const url = `${this.environment.apiEndpoint}/notifications/channels`;

    return this.http.get<Channel[]>(url);
  }

  loadNotifications(offset: number, length: number): Observable<Notification[]> {

    return getAuthToken().pipe(
      filter(authToken => authToken != null),
      switchMap(authToken => this.getNotifications(authToken, offset, length)),
      tap((notifications) => {
        if (offset === 0) {
          setNotifications(notifications);
        } else {
          addNotifications(notifications);
        }
      })
    );
  }

  public deleteNotification(id: string)  {
    return getAuthToken().pipe(
      first(),
      filter(authToken => authToken != null),
      switchMap(authToken => this.removeNotification(authToken, id)),
    );
  }

  public mapToTranslatedChannels(channels, currentLanguage): TranslatedChannel[] {
    const translated: TranslatedChannel[] = [];
    channels.map(channel => {
      const translation =
        channel.translations.find((t) => t.languages_code === currentLanguage) ||
        channel.translations.find((t) => t.languages_code === this.environment.defaultLanguage) ||
        channel.translations[0];
      translated.push({ label: translation.label, code: channel.name });
    });
    return translated;
  }

  public markUnreadNotificationsAsRead(notificationIds: string[]): Observable<void> {
    return getAuthToken().pipe(
      filter(authToken => authToken != null),
      switchMap(authToken => {
        const url = `${this.environment.apiEndpoint}/notifications/read`;
        const data = {
          authToken,
          notificationIds
        };

        return this.http.post<void>(url, data);
      })
    );
  }

  private removeNotification(authToken: string, id: string) {
    const url = `${this.environment.apiEndpoint}/notifications/delete`;
    const data = {
      authToken,
      id
    };

    return this.http.delete(url, {body: data});
  }
}
