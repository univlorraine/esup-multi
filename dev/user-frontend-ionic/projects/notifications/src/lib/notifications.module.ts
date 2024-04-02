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

import { CommonModule } from '@angular/common';
import { APP_INITIALIZER, ModuleWithProviders, NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FirebaseMessaging, Notification as NotificationCapacitor } from '@capacitor-firebase/messaging';
import { Device } from '@capacitor/device';
import { IonicModule, Platform, ToastController } from '@ionic/angular';
import { EffectsNgModule } from '@ngneat/effects-ng';
import { TranslateModule } from '@ngx-translate/core';
import { NotificationsRepository, ProjectModuleService, SharedComponentsModule, SharedPipeModule } from '@multi/shared';
import { NotificationOptionsComponent } from './notification-options/notification-options.component';
import { NotificationsRoutingModule } from './notifications-routing.module';
import { NotificationsModuleConfig, NOTIFICATIONS_CONFIG } from './notifications.config';
import { NotificationsEffects } from './notifications.effects';
import { NotificationsPage } from './notifications.page';
import { SettingsPage } from './settings/settings.page';


const initModule = (projectModuleService: ProjectModuleService,
  notificationsRepository: NotificationsRepository,
  toastController: ToastController,
  platform: Platform) =>
  () => {
    projectModuleService.initProjectModule({
      name: 'notifications',
      translation: true,
    });
    NotificationsModule.initPushNotifications(notificationsRepository, toastController, platform);
  };

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    NotificationsRoutingModule,
    TranslateModule,
    ReactiveFormsModule,
    SharedComponentsModule,
    EffectsNgModule.forFeature([NotificationsEffects]),
    SharedPipeModule
  ],
  declarations: [
    NotificationsPage,
    SettingsPage,
    NotificationOptionsComponent,
  ],
  providers: [{
    provide: APP_INITIALIZER,
    useFactory: initModule,
    deps: [
      ProjectModuleService,
      NotificationsRepository,
      ToastController,
      Platform,
    ],
    multi: true
  }]
})

export class NotificationsModule {

  static routerLink = '/notifications';

  constructor() { }

  static forRoot(config: NotificationsModuleConfig): ModuleWithProviders<NotificationsModule> {
    return {
      ngModule: NotificationsModule,
      providers: [
        { provide: NOTIFICATIONS_CONFIG, useValue: config }
      ]
    };
  }

  static async initPushNotifications(
    notificationsRepository: NotificationsRepository,
    toastController: ToastController,
    platform: Platform
  ) {

    const createToast = (notification: Notification | NotificationCapacitor) => (
      toastController.create({
        header: notification.title,
        message: notification.body.length >= 110 ? notification.body.slice(0, 110) + '...' : notification.body,
        position: 'top',
        duration: 4000,
      })
    );

    if (!platform.is('capacitor')) { // Web

      navigator.serviceWorker.addEventListener('message', (event: any) => {
        createToast(event.data.notification).then(toast => toast.present());
      });

    } else { // Mobile

      // @TODO à supprimer une fois la mise à jour vers capacitor 5 effectuée =>
      // Android 13 = pas de demande d'autorisation de notification avant la première notification reçue qui, elle, ne sera pas affichée.
      // Donc création d'un "channel" pour utiliser la fonctionnalité notification Android sans envoyer
      // de notification et donc déclencher une demande d'autorisation (le chanel est créé une seule fois à l'installation de l'application)

      const info = await Device.getInfo();
      if (info.platform === 'android' && parseInt(info.osVersion, 10) >= 13) {
        FirebaseMessaging.createChannel({
          id: 'fcm_default_channel',
          name: 'multi',
          description: 'Channel pour demande autorisation Android 13+',
          importance: 5,
          visibility: 1,
          lights: true,
          vibration: true,
        });
      }
      // _______________________________________

      await FirebaseMessaging.addListener('notificationReceived', event => {
        createToast(event.notification).then(toast => toast.present());
      });

    }
  }
}
