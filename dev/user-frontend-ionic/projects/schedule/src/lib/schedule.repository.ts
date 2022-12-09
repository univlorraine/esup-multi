import { createStore, select, withProps } from '@ngneat/elf';
import {
    localStorageStrategy, persistState
} from '@ngneat/elf-persist-state';

const STORE_NAME = 'schedule';

export interface ScheduleProps {
    schedule: Schedule;
};

export interface Schedule {
    messages: [Message?];
    plannings?: Plannings[];
  };

  export interface Message {
    level: string;
    code: string;
    text: string;
  };

  export interface Plannings {
    id: string;
    label: string;
    default: boolean;
    type: string;
    messages: [
      {
        level: string;
        text: string;
      }
    ];
    events?: Event[];
  };

  export interface Event {
    id: string;
    startDateTime: string;
    endDateTime: string;
    course: {
      id: string;
      label: string;
      color: string;
      type: string;
      online: boolean;
      url?: string;
    };
    rooms: [
      {
        id: string;
        label: string;
        type: string;
      }
    ];
    teachers: [
      {
        id: string;
        firstname: string;
        lastname: string;
        email: string;
      }
    ];
    groups: [
      {
        id: string;
        label: string;
      }
    ];
};


const scheduleStore = createStore(
    { name: STORE_NAME },
    withProps<ScheduleProps>({ schedule: null })
);

export const persist = persistState(scheduleStore, {
    key: STORE_NAME,
    storage: localStorageStrategy,
});

export const schedule$ = scheduleStore.pipe(select((state) => state.schedule));

export const setSchedule = (schedule: ScheduleProps['schedule']) => {
    scheduleStore.update((state) => ({
        ...state,
        schedule,
    }));
};
