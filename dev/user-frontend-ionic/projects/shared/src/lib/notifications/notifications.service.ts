/*
 * Copyright ou © ou Copr. Université de Lorraine, (2022)
 *
 * Direction du Numérique de l'Université de Lorraine - SIED
 *  (dn-mobile-dev@univ-lorraine.fr)
 * JNESIS (contact@jnesis.com)
 *
 * Ce logiciel est un programme informatique servant à rendre accessible
 * sur mobile divers services universitaires aux étudiants et aux personnels
 * de l'université.
 *
 * Ce logiciel est régi par la licence CeCILL 2.1, soumise au droit français
 * et respectant les principes de diffusion des logiciels libres. Vous pouvez
 * utiliser, modifier et/ou redistribuer ce programme sous les conditions
 * de la licence CeCILL telle que diffusée par le CEA, le CNRS et INRIA
 * sur le site "http://cecill.info".
 *
 * En contrepartie de l'accessibilité au code source et des droits de copie,
 * de modification et de redistribution accordés par cette licence, il n'est
 * offert aux utilisateurs qu'une garantie limitée. Pour les mêmes raisons,
 * seule une responsabilité restreinte pèse sur l'auteur du programme, le
 * titulaire des droits patrimoniaux et les concédants successifs.
 *
 * À cet égard, l'attention de l'utilisateur est attirée sur les risques
 * associés au chargement, à l'utilisation, à la modification et/ou au
 * développement et à la reproduction du logiciel par l'utilisateur étant
 * donné sa spécificité de logiciel libre, qui peut le rendre complexe à
 * manipuler et qui le réserve donc à des développeurs et des professionnels
 * avertis possédant des connaissances informatiques approfondies. Les
 * utilisateurs sont donc invités à charger et à tester l'adéquation du
 * logiciel à leurs besoins dans des conditions permettant d'assurer la
 * sécurité de leurs systèmes et/ou de leurs données et, plus généralement,
 * à l'utiliser et à l'exploiter dans les mêmes conditions de sécurité.
 *
 * Le fait que vous puissiez accéder à cet en-tête signifie que vous avez
 * pris connaissance de la licence CeCILL 2.1, et que vous en avez accepté les
 * termes.
 */

import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { FirebaseMessaging, GetTokenOptions } from '@capacitor-firebase/messaging';
import { Platform } from '@ionic/angular';
import { getAuthToken } from '../auth/auth.repository';
import { combineLatest, Observable, of } from 'rxjs';
import { filter, switchMap, take, tap } from 'rxjs/operators';
import { Channel, Notification, NotificationsRepository } from './notifications.repository';
import { Badge } from '@capawesome/capacitor-badge';
import { NetworkService } from '../network/network.service';
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
    private platform: Platform,
    private networkService: NetworkService
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
    return combineLatest([
      getAuthToken(),
      this.networkService.getConnectionStatus()
    ]).pipe(
      filter(([authToken, status]) => authToken != null && status.connected),
      switchMap(([authToken]) => this.getNotifications(authToken, offset, length)),
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
      take(1),
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
    Badge.clear();
    FirebaseMessaging.removeAllDeliveredNotifications();

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
    this.registerPushNotifications();
    combineLatest([getAuthToken(), this.notificationRepository.fcmToken$])
      .pipe(
        filter(([authToken, fcmToken]) => !!fcmToken),
        take(1),
        switchMap(([authToken, fcmToken]) => {
          const url = `${this.environment.apiEndpoint}/notifications/register`;

          const data = {
            authToken,
            token: fcmToken,
            platform: Capacitor.getPlatform() === 'ios'
              ? 'iOS'
              : Capacitor.getPlatform() === 'android'
                ? 'Android'
                : 'web',
          };
          return this.http.post(url, data);
        })
      )
      .subscribe(res => res);
  }

  public async unregisterFCMToken(authToken: string) {
    if (!authToken) {
      return;
    }
    this.notificationRepository.fcmToken$
      .pipe(
        take(1),
        switchMap((fcmToken) => {
          if (!fcmToken) {
            return of(null);
          }
          const url = `${this.environment.apiEndpoint}/notifications/unregister`;

          const data = {
            authToken,
            fcmToken,
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

  private async registerPushNotifications() {
    if (!this.platform.is('capacitor')) { // Web
      FirebaseMessaging.requestPermissions();

      const options: GetTokenOptions = {
        vapidKey: this.environment.firebase.vapidKey,
      };

      navigator.serviceWorker.register('firebase-messaging-sw.js').then(registration => {
        options.serviceWorkerRegistration = registration;
        FirebaseMessaging.getToken(options).then(tokenResult => {
          // NOTE: when the user resets the notifications authorisation and wants to allow it again, this will trigger
          // a 404 error from firebase followed by this message in the console: "FirebaseError: Messaging: A problem
          // occured while unsubscribing the user from FCM", it has been reported since 2019 in this thread but hasn't
          // been solved since: https://github.com/firebase/firebase-js-sdk/issues/2364
          // It could be fixed by firebase in a future release
          this.notificationRepository.setFcmToken(tokenResult.token);
        });
      });
    } else { // Mobile
      await FirebaseMessaging.requestPermissions().then(result => {
        if (result.receive === 'granted') {
          FirebaseMessaging.getToken().then(tokenResult => {
            this.notificationRepository.setFcmToken(tokenResult.token);
          });
        }
      });
    }
  }
}
