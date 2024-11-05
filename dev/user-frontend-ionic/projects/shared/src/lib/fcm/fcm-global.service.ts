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

import { Inject, Injectable } from '@angular/core';
import { FirebaseMessaging, GetTokenOptions } from '@capacitor-firebase/messaging';
import { Platform } from '@ionic/angular';
import { NotificationsRepository } from '../notifications/notifications.repository';
import { FCMRepository } from './fcm.repository';

@Injectable({
  providedIn: 'root'
})
export class FCMService {

  private currentTopic: string;

  constructor(
    @Inject('environment')
    private environment: any,
    public fcmRepository: FCMRepository,
    private platform: Platform
  ) {
  }

  public unsubscribeFromTopic() {
    if(this.currentTopic){
      FirebaseMessaging.unsubscribeFromTopic({ topic: this.currentTopic });
    }
  }

  public removeAllDeliveredNotifications() {
    if (this.platform.is('capacitor')) {
      FirebaseMessaging.removeAllDeliveredNotifications();
    }
  }

  public async registerPushNotifications(topic?: string): Promise<string | null> {
    // Vérifie que l'utilisateur a bien autorisé les notifications
    const notificationPermissions = await FirebaseMessaging.requestPermissions();

    if (notificationPermissions.receive !== 'granted') {
      return null;
    }

    // Fonction qui enregistre le token FCM dans le state
    const handleToken = (tokenResult: { token: string }) => {
      // NOTE: on web browser when the user resets the notifications authorisation and wants to allow it again,
      // this will trigger a 404 error from firebase followed by this message in the console:
      // "FirebaseError: Messaging: A problem  occured while unsubscribing the user from FCM",
      // it has been reported since 2019 in this thread but hasn't been solved since:
      // https://github.com/firebase/firebase-js-sdk/issues/2364
      // It could be fixed by firebase in a future release
      this.fcmRepository.setFcmToken(tokenResult.token);
      return tokenResult.token || null;
    }

    if (!this.platform.is('capacitor')) { // Web
      const options: GetTokenOptions = {
        vapidKey: this.environment.firebase.vapidKey,
        serviceWorkerRegistration: await navigator.serviceWorker.register('firebase-messaging-sw.js'),
      };

      const tokenResult = await FirebaseMessaging.getToken(options);
      return handleToken(tokenResult);
    } else { // Mobile
      const tokenResult = await FirebaseMessaging.getToken();
      if(topic) {
        this.subscribeToTopic(topic)
      }
      return handleToken(tokenResult);
    }
  }

  private subscribeToTopic(topic: string) {
    FirebaseMessaging.subscribeToTopic({ topic }).then(() => {
      this.currentTopic = topic;
    });
  }
}
