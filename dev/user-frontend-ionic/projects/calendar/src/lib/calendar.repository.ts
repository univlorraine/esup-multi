import { createStore, select, withProps } from '@ngneat/elf';
import { persistState } from '@ngneat/elf-persist-state';
import { localForageStore } from '@ul/shared';

const STORE_NAME = 'calendar';

export interface MailCalendar {
  events: MailCalendarEvent[];
}

export type MailCalendarEvents = MailCalendar['events'];

export interface MailCalendarEvent {
  label: string;
  startDateTime: string;
  endDateTime: string;
  location: string;
}

export const store = createStore({ name: STORE_NAME }, withProps<MailCalendar>({ events: null }));

export const persist = persistState(store, {
  key: STORE_NAME,
  storage: localForageStore,
});

export const events$ = store.pipe(select((state) => state.events));

export const setEvents = (events: MailCalendar['events']) => {
  store.update((state) => ({
    ...state,
    events,
  }));
};
