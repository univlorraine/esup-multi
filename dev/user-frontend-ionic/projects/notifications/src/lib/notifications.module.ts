import { CommonModule } from '@angular/common';
import { APP_INITIALIZER, ModuleWithProviders, NgModule } from '@angular/core';
import { Capacitor } from '@capacitor/core';
import { Device } from '@capacitor/device';
import { PushNotifications, Token } from '@capacitor/push-notifications';
import { IonicModule } from '@ionic/angular';
import { TranslateModule } from '@ngx-translate/core';
import { ProjectModuleService } from '@ul/shared';
import { CompleteLocalDateAndTimePipe } from './complete-local-date-and-time.pipe';
import { NotificationsRoutingModule } from './notifications-routing.module';
import { NotificationsModuleConfig, NOTIFICATIONS_CONFIG } from './notifications.config';
import { NotificationsPage } from './notifications.page';
import { setFcmToken } from './notifications.repository';


const initModule = (projectModuleService: ProjectModuleService) =>
  () => projectModuleService.initProjectModule({
    name: 'notifications',
    translation: true,
    menuItems: [{
      title: 'NOTIFICATIONS.MENU',
      icon: 'notifications-outline',
      position: 60,
      path: NotificationsModule.path
    }]
  });

@NgModule({
  imports: [
    CommonModule,
    IonicModule,
    NotificationsRoutingModule,
    TranslateModule
  ],
  declarations: [
    NotificationsPage,
    CompleteLocalDateAndTimePipe
  ],
  providers: [{
    provide: APP_INITIALIZER,
    useFactory: initModule,
    deps: [ProjectModuleService],
    multi: true
  }]
})

export class NotificationsModule {

  static path = 'notifications';

  constructor() {
    this.initPushNotifications();
  }

  static forRoot(config: NotificationsModuleConfig): ModuleWithProviders<NotificationsModule> {
    return {
      ngModule: NotificationsModule,
      providers: [
        { provide: NOTIFICATIONS_CONFIG, useValue: config }
      ]
    };
  }

  async initPushNotifications() {

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
        setFcmToken(token);
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
