import { Token } from '@capacitor/push-notifications';
import { createStore, select, withProps } from '@ngneat/elf';
import {
  persistState
} from '@ngneat/elf-persist-state';
import { localForageStore } from '@ul/shared';
import { combineLatest, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

const STORE_NAME = 'notifications';
const defaultNotificationColor = 'black';
const defaultNotificationIcon = 'information-circle';

export interface NotificationsProps {
  fcmToken: Token;
  notifications: Notification[];
  channels: Channel[];
}

export interface Notification {
  id: number;
  author: string;
  channel: string;
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
  name: string;
  color?: string;
  translations?: Translation[];
  icon?: string;
  appsRouterLink?: string;
}

interface Translation {
  // eslint-disable-next-line @typescript-eslint/naming-convention
  languages_code: string;
  label: string;
}
export interface TranslatedChannel {
  code: string;
  label: string;
}

const notificationsStore = createStore(
  { name: STORE_NAME },
  withProps<NotificationsProps>({
    fcmToken: null,
    notifications: [],
    channels: []
  })
);

export const persist = persistState(notificationsStore, {
  key: STORE_NAME,
  storage: localForageStore,
});

export const fcmToken$ = notificationsStore.pipe(select((state) => state.fcmToken));
export const channels$ = notificationsStore.pipe(select((state) => state.channels));

export const notifications$: Observable<Notification[]> = combineLatest(
  [notificationsStore.pipe(select((state) => state.notifications)), channels$]
).pipe(
  map(([notifications, channels]) => {
    notifications.map(notification => {
      const matchedChannel = channels.find(channel => notification.channel === channel.name);
      notification.color = matchedChannel?.color ? matchedChannel.color : defaultNotificationColor;
      notification.icon = matchedChannel?.icon ? matchedChannel.icon : defaultNotificationIcon;
      notification.appsRouterLink = matchedChannel?.appsRouterLink ? matchedChannel.appsRouterLink : null;
    }
    );
    return notifications;
  }));

export const setFcmToken = (fcmToken: NotificationsProps['fcmToken']) => {
  notificationsStore.update((state) => ({
    ...state,
    fcmToken,
  }));
};

export const setNotifications = (notifications: NotificationsProps['notifications']) => {
  notificationsStore.update((state) => ({
    ...state,
    notifications
  }));
};

export const addNotifications = (notifications: Notification[]) => {
  notificationsStore.update((state) => ({
    ...state,
    notifications: [...state.notifications, ...notifications]
  }));
};

export const setChannels = (channels: NotificationsProps['channels']) => {
  notificationsStore.update((state) => ({
    ...state,
    channels,
  }));
};
