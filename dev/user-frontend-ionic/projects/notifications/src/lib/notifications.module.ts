import { CommonModule } from '@angular/common';
import { APP_INITIALIZER, ModuleWithProviders, NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { Capacitor } from '@capacitor/core';
import { Device } from '@capacitor/device';
import { PushNotifications, Token } from '@capacitor/push-notifications';
import { IonicModule } from '@ionic/angular';
import { TranslateModule } from '@ngx-translate/core';
import { ProjectModuleService, SharedComponentsModule } from '@ul/shared';
import { CompleteLocalDateAndTimePipe } from './complete-local-date-and-time.pipe';
import { NotificationOptionsComponent } from './notification-options/notification-options.component';
import { NotificationsRoutingModule } from './notifications-routing.module';
import { NotificationsModuleConfig, NOTIFICATIONS_CONFIG } from './notifications.config';
import { NotificationsPage } from './notifications.page';
import { NotificationsRepository } from './notifications.repository';
import { ChannelSubscriptionComponent } from './settings/channel-subscription/channel-subscription.component';
import { SettingsPage } from './settings/settings.page';


const initModule = (projectModuleService: ProjectModuleService, notificationsRepository: NotificationsRepository) =>
  () => {
    projectModuleService.initProjectModule({
      name: 'notifications',
      translation: true,
      menuItems: [{
        title: 'NOTIFICATIONS.MENU',
        icon: 'notifications-outline',
        position: 60,
        routerLink: NotificationsModule.routerLink,
        type: 'top',
      }],
      pageConfigurations: [{
        routerLink: NotificationsModule.routerLink,
        disableAutoHeader: true,
      }]
    });
    NotificationsModule.initPushNotifications(notificationsRepository);
  };

@NgModule({
  imports: [
    CommonModule,
    IonicModule,
    NotificationsRoutingModule,
    TranslateModule,
    ReactiveFormsModule,
    SharedComponentsModule
  ],
  declarations: [
    NotificationsPage,
    CompleteLocalDateAndTimePipe,
    ChannelSubscriptionComponent,
    SettingsPage,
    NotificationOptionsComponent
  ],
  providers: [{
    provide: APP_INITIALIZER,
    useFactory: initModule,
    deps: [
      ProjectModuleService,
      NotificationsRepository
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

  static async initPushNotifications(notificationsRepository: NotificationsRepository) {

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

    PushNotifications.requestPermissions().then(result => {
      if (result.receive === 'granted') {
        PushNotifications.register();
      }
    });

    PushNotifications.addListener('registration',
      (token: Token) => {
        notificationsRepository.setFcmToken(token);
      }
    );

    PushNotifications.addListener('registrationError',
      (error: any) => {
        throw new Error(error);
      }
    );


    // PushNotifications.addListener('pushNotificationReceived',
    //   (notification: PushNotificationSchema) => {
    // à compléter pour ticket MULTI-122 affichage notifications
    // test si recois bien la notif sans ajouter listener
    // }
    // );
  }
}
