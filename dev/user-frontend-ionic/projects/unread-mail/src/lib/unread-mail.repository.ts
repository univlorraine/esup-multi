import { createStore, select, withProps } from '@ngneat/elf';
import { persistState } from '@ngneat/elf-persist-state';
import { localForageStore } from '@ul/shared';

const STORE_NAME = 'unread-mail';

export interface MailCalendar {
  unreadMails: number;
}

export type MailCalendarMails = MailCalendar['unreadMails'];

export const store = createStore({ name: STORE_NAME }, withProps<MailCalendar>({ unreadMails: null }));

export const persist = persistState(store, {
  key: STORE_NAME,
  storage: localForageStore,
});

export const mails$ = store.pipe(select((state) => state.unreadMails));

export const setMails = (unreadMails: MailCalendarMails) => {
  store.update((state) => ({
    ...state,
    unreadMails,
  }));
};
