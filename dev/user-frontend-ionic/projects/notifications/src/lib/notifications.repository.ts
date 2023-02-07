import { Token } from '@capacitor/push-notifications';
import { createStore, select, withProps } from '@ngneat/elf';
import {
  persistState
} from '@ngneat/elf-persist-state';
import { localForageStore } from '@ul/shared';

const STORE_NAME = 'notifications';

export interface NotificationsProps {
    fcmToken: Token;
}

const notificationsStore = createStore(
    { name: STORE_NAME },
    withProps<NotificationsProps>({ fcmToken: null})
  );

export const persist = persistState(notificationsStore, {
    key: STORE_NAME,
    storage: localForageStore,
});

export const fcmToken$ = notificationsStore.pipe(select((state) => state.fcmToken));

export const setFcmToken = (fcmToken: NotificationsProps['fcmToken']) => {
    notificationsStore.update((state) => ({
    ...state,
    fcmToken,
  }));
};
