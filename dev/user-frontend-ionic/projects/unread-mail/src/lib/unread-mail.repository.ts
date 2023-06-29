import { createStore, select, withProps } from '@ngneat/elf';
import { persistState } from '@ngneat/elf-persist-state';
import { localForageStore } from '@ul/shared';

const STORE_NAME = 'unread-mail';

export interface MailCalendar {
  unreadMails: number;
}

export const store = createStore({ name: STORE_NAME }, withProps<MailCalendar>({ unreadMails: null }));

export const persist = persistState(store, {
  key: STORE_NAME,
  storage: localForageStore,
});

export const mails$ = store.pipe(select((state) => state));

export const setMails = (mailCalendar: MailCalendar) => {
  store.update((state) => ({
    ...state,
    unreadMails: mailCalendar.unreadMails,
  }));
};
