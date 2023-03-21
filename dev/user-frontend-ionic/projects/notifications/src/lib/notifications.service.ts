import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { getAuthToken } from '@ul/shared';
import { Observable } from 'rxjs';
import { filter, first, switchMap, tap } from 'rxjs/operators';
import { Channel, Notification, NotificationsRepository, TranslatedChannel } from './notifications.repository';

@Injectable({
  providedIn: 'root'
})
export class NotificationsService {

  constructor(
    @Inject('environment')
    private environment: any,
    private http: HttpClient,
    public notificationRepository: NotificationsRepository
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

  public loadAndStoreChannels(): Observable<Channel[]> {
    const url = `${this.environment.apiEndpoint}/notifications/channels`;

    return this.http.get<Channel[]>(url).pipe(
      tap((channels) => {
        this.notificationRepository.setChannels(channels);
      }));
  }

  public loadNotifications(offset: number, length: number): Observable<Notification[]> {

    return getAuthToken().pipe(
      filter(authToken => authToken != null),
      switchMap(authToken => this.getNotifications(authToken, offset, length)),
      tap((notifications) => {
        if (offset === 0) {
          this.notificationRepository.setNotifications(notifications);
        } else {
          this.notificationRepository.addNotifications(notifications);
        }
      })
    );
  }

  public deleteNotification(id: string) {
    return getAuthToken().pipe(
      first(),
      filter(authToken => authToken != null),
      switchMap(authToken => this.removeNotification(authToken, id)),
    );
  }

  public loadAndStoreUnsubscribedChannels(): Observable<string[]> {
    return getAuthToken().pipe(
      filter(authToken => authToken != null),
      switchMap(authToken => {
        const url = `${this.environment.apiEndpoint}/notifications/unsubscribed-channels`;
        const data = {
          authToken
        };

        return this.http.post<string[]>(url, data);
      }),
      tap((userChannels) => {
        this.notificationRepository.setUnsubscribedChannels(userChannels);
      }
      ));
  }

  public subscribeOrUnsubscribeUserToChannel(options: { isSubscription: boolean; channelCode: string }): Observable<any> {
    return getAuthToken().pipe(
      filter(authToken => authToken != null),
      switchMap(authToken => {
        const url = `${this.environment.apiEndpoint}/notifications/channels/allow-or-disallow`;
        const data = {
          authToken,
          channelCode: options.channelCode,
          isSubscription: options.isSubscription
        };

        return this.http.post(url, data);
      }
      ));
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

    return this.http.delete(url, { body: data });
  }
}
