import { Inject, Injectable } from '@angular/core';
import { Token } from '@capacitor/push-notifications';
import { createStore, select, withProps } from '@ngneat/elf';
import { addEntities, deleteEntities, selectAllEntities, setEntities, withEntities } from '@ngneat/elf-entities';
import {
  persistState
} from '@ngneat/elf-persist-state';
import { currentLanguage$, localForageStore } from '@ul/shared';
import { combineLatest, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

const NOTIFICATIONS_STORE = 'notifications';
const CHANNELS_STORE= 'channels';

const defaultNotificationColor = 'black';
const defaultNotificationIcon = 'information-circle';

export interface NotificationsProps {
  fcmToken: Token;
}

export interface ChannelsProps {
  unsubscribedChannels: string[];
}

export interface Notification {
  id: string;
  author: string;
  channel: string;
  channelLabel: string;
  icon: string;
  title: string;
  message: string;
  state: string;
  creationDate: string;
  color: string;
  appsRouterLink?: string;
}

export interface Channel {
  id: number;
  code: string;
  color?: string;
  translations?: Translation[];
  icon?: string;
  appsRouterLink?: string;
  filterable: boolean;
}

interface Translation {
  // eslint-disable-next-line @typescript-eslint/naming-convention
  languages_code: string;
  label: string;
}
export interface TranslatedChannel {
  code: string;
  label: string;
  filterable: boolean;
}

const notificationsStore = createStore(
  { name: NOTIFICATIONS_STORE },
  withProps<NotificationsProps>({
    fcmToken: null,
  }),
  withEntities<Notification>(),
);

const channelsStore = createStore(
  { name: CHANNELS_STORE },
  withProps<ChannelsProps>({
    unsubscribedChannels: [],
  }),
  withEntities<Channel>()
);

@Injectable({ providedIn: 'root' })
export class NotificationsRepository {

  public fcmToken$ = notificationsStore.pipe(select((state) => state.fcmToken));
  public channels$ = channelsStore.pipe(selectAllEntities());
  public unsubscribedChannels$ = channelsStore.pipe(select((state) => state.unsubscribedChannels));

  public notifications$: Observable<Notification[]> = combineLatest([
    notificationsStore.pipe(selectAllEntities()),
    this.channels$
  ]).pipe(
    map(([notifications, channels]) => notifications.map(notification => {
        const matchedChannel = channels.find(channel => notification.channel === channel.code);
        notification.color = matchedChannel?.color ? matchedChannel.color : defaultNotificationColor;
        notification.icon = matchedChannel?.icon ? matchedChannel.icon : defaultNotificationIcon;
        notification.appsRouterLink = matchedChannel?.appsRouterLink ? matchedChannel.appsRouterLink : null;
        return notification;
      }))
  );

  public translatedChannels$ = combineLatest([this.channels$, currentLanguage$]).pipe(
    map(([channels, currentLanguage]) => channels.map(channel => {
        const translation = channel.translations.find((t) => t.languages_code === currentLanguage) ||
          channel.translations.find((t) => t.languages_code === this.environment.defaultLanguage) ||
          channel.translations[0];
        return { label: translation.label, code: channel.code, filterable: channel.filterable };
      }))
  );

  private persistNotificationsStore = persistState(notificationsStore, {
    key: NOTIFICATIONS_STORE,
    storage: localForageStore,
  });

  private persistChannelsStore = persistState(channelsStore, {
    key: CHANNELS_STORE,
    storage: localForageStore,
  });

  constructor(
    @Inject('environment')
    private environment: any,) {
  }

  public setFcmToken(fcmToken: Token) {
    notificationsStore.update((state) => ({
      ...state,
      fcmToken,
    }));
  }

  public setNotifications(notifications: Notification[]) {
    notificationsStore.update(setEntities(notifications));
  }

  public addNotifications(notifications: Notification[]) {
    notificationsStore.update(addEntities(notifications));
  }

  public deletNotification(id: string){
    notificationsStore.update(deleteEntities(id));
  }

  public setChannels(channels: Channel[]) {
    channelsStore.update(setEntities(channels));
  }

  public setUnsubscribedChannels(userUnsubscribedChannels: string[]) {
    channelsStore.update((state) => ({
      ...state,
      unsubscribedChannels: userUnsubscribedChannels,
    }));
  }

  public subscribeChannel(channelCode: string){
    channelsStore.update((state) => ({
          ...state,
          unsubscribedChannels: state.unsubscribedChannels.filter((code) => code !== channelCode)
        }));
  }

  public unsubscribeChannel(channelCode: string){
    channelsStore.update((state) => ({
          ...state,
          unsubscribedChannels: [...state.unsubscribedChannels, channelCode]
        }));
  }
}
