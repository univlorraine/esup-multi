import { CommonModule } from '@angular/common';
import { APP_INITIALIZER, ModuleWithProviders, NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Capacitor } from '@capacitor/core';
import { Device } from '@capacitor/device';
import { PushNotifications, PushNotificationSchema, Token } from '@capacitor/push-notifications';
import {IonicModule, Platform, ToastController} from '@ionic/angular';
import { EffectsNgModule } from '@ngneat/effects-ng';
import { TranslateModule } from '@ngx-translate/core';
import { ProjectModuleService, SharedComponentsModule, SharedPipeModule } from '@ul/shared';
import { NotificationOptionsComponent } from './notification-options/notification-options.component';
import { NotificationsRoutingModule } from './notifications-routing.module';
import { NotificationsModuleConfig, NOTIFICATIONS_CONFIG } from './notifications.config';
import { NotificationsEffects } from './notifications.effects';
import { NotificationsPage } from './notifications.page';
import { NotificationsRepository } from './notifications.repository';
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

  constructor() {}

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
    const createToast = (notification: PushNotificationSchema) => (
      toastController.create({
        header: notification.title,
        message: notification.body.length >= 110 ? notification.body.slice(0, 110) + '...' : notification.body,
        position: 'top',
        duration: 4000,
      })
    );

    if(!platform.is('capacitor')) { // Web

      navigator.serviceWorker.addEventListener('message', (event: any) => {
        const notification = new Notification(event.data.notification.title, {
          body: event.data.notification.body,
        });

        createToast(event.data.notification).then(toast => toast.present());
      });

    } else { // Mobile

      const isPushNotificationsAvailable = Capacitor.isPluginAvailable('PushNotifications');
      if (!isPushNotificationsAvailable) { return; }

      // @TODO à supprimer une fois la mise à jour vers capacitor 5 effectuée =>
      // Android 13 = pas de demande d'autorisation de notification avant la première notification reçue qui, elle, ne sera pas affichée.
      // Donc création d'un "channel" pour utiliser la fonctionnalité notification Android sans envoyer
      // de notification et donc déclencher une demande d'autorisation (le chanel est créé une seule fois à l'installation de l'application)

      const info = await Device.getInfo();
      if (info.platform === 'android' && parseInt(info.osVersion, 10) >= 13) {
        PushNotifications.createChannel({
          id: 'fcm_default_channel',
          name: 'multi',
          description: 'Channel pour demande autorisation Android 13+',
          importance: 5,
          visibility: 1,
          lights: true,
          vibration: true,
        });
      }
      //_______________________________________

      PushNotifications.addListener('registrationError',
        (error: any) => {
          throw new Error(error);
        }
      );

      PushNotifications.addListener('pushNotificationReceived',
        async (notification: PushNotificationSchema) => {
          const toast = await createToast(notification);
          return toast.present();
        }
      );
    }
  }
}
