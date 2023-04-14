import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { Platform } from '@ionic/angular';
import { getAuthToken } from '@ul/shared';
import { combineLatest, Observable, of } from 'rxjs';
import { filter, first, switchMap, take, tap } from 'rxjs/operators';
import { Channel, Notification, NotificationsRepository, TranslatedChannel } from './notifications.repository';
import { PushNotifications, Token } from '@capacitor/push-notifications';
import { Capacitor } from '@capacitor/core';

@Injectable({
  providedIn: 'root'
})
export class NotificationsService {

  constructor(
    @Inject('environment')
    private environment: any,
    private http: HttpClient,
    public notificationRepository: NotificationsRepository,
    private platform: Platform
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

  public subscribeOrUnsubscribeUserToChannels(options: { channelCodes: string[] }): Observable<any> {
    return getAuthToken().pipe(
      filter(authToken => authToken != null),
      switchMap(authToken => {
        const url = `${this.environment.apiEndpoint}/notifications/channels`;
        const data = {
          authToken,
          channelCodes: options.channelCodes,
        };

        return this.http.patch(url, data);
      }
      ));
  }

  public markUnreadNotificationsAsRead(notificationIds: string[]): Observable<void> {
    return getAuthToken().pipe(
      // On ne balance la requête au serveur que si la liste des notifications à marquer comme lues n'est pas vide
      filter(authToken => authToken != null && notificationIds.length > 0),
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

  public async saveFCMToken() {
    if (!Capacitor.isNativePlatform()) {
      return;
    }
    this.registerPushNotifications();
    combineLatest([getAuthToken(), this.notificationRepository.fcmToken$])
      .pipe(
        filter(([authToken, fcmToken]) => !!fcmToken),
        first(),
        switchMap(([authToken, fcmToken]) => {
          const url = `${this.environment.apiEndpoint}/notifications/register`;
          const data = {
            authToken,
            token: fcmToken.value,
            platform: this.platform.platforms().join(',')
          };
          return this.http.post(url, data);
        })
      )
      .subscribe(res => res);

  }

  public async unregisterFCMToken(authToken: string) {
    if (!Capacitor.isNativePlatform() || !authToken) {
      return;
    }
    this.notificationRepository.fcmToken$
      .pipe(
        switchMap((fcmToken) => {
          if (!fcmToken) {
            return;
          }
          const url = `${this.environment.apiEndpoint}/notifications/unregister`;
          const data = {
            authToken,
            fcmToken: fcmToken.value,
          };
          return this.http.post(url, data);
        })
      )
      .subscribe(res => {
        this.deleteFCMToken();
        return;
      });
}

  public async deleteFCMToken() {
    this.notificationRepository.clearNotifications();
  }

  private removeNotification(authToken: string, notificationId: string) {
    const url = `${this.environment.apiEndpoint}/notifications/delete`;
    const data = {
      authToken,
      notificationId
    };

    return this.http.delete(url, { body: data });
  }

  private registerPushNotifications() {
    PushNotifications.requestPermissions().then(result => {
      if (result.receive === 'granted') {
        PushNotifications.register();
      }
    });

    PushNotifications.addListener('registration',
      (token: Token) => {
        this.notificationRepository.setFcmToken(token);
      }
    );
  }
}
