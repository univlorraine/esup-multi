import { createStore, select, withProps } from '@ngneat/elf';
import {
  persistState
} from '@ngneat/elf-persist-state';
import { localForageStore } from '@ul/shared';
import { combineLatest } from 'rxjs';
import { map } from 'rxjs/operators';

const STORE_NAME = 'schedule';

export interface ScheduleProps {
  schedule: Schedule;
  activePlanningIds: string[];
  hiddenEvents: HiddenEvent[];
};

export interface Schedule {
  messages: [Message?];
  plannings?: Planning[];
};

export interface Message {
  level: string;
  code: string;
  text: string;
};

export interface Planning {
  id: string;
  // @TODO code: a retirer une fois l'api en place
  code: string;
  label: string;
  default: boolean;
  type: string;
  messages: [
    {
      level: string;
      text: string;
    }
  ] | [];
  events?: Event[];
  isSelected: boolean;
};

export interface Event {
  id: string;
  // @TODO _adeEventId: a retirer une fois l'api en place
  _adeEventId: number;
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
      name: string; // @TODO supprimer cette ligne une fois la nouvelle API en place
    }
  ];
  groups: [
    {
      id: string;
      label: string;
    }
  ];
};

export interface HiddenEvent {
  id: string;
  title: string;
}

const filterDefaultPlanning = (planning: Planning): boolean => planning.default === true;
const mapPlanningId = (planning: Planning): string =>
  planning.id || (planning as any).code; // @TODO supprimer .code une fois la nouvelle API en place

export interface SelectedPlanningProps {
  selectedPlanning: string[];
};

export const scheduleStore = createStore(
  { name: STORE_NAME },
  withProps<ScheduleProps>({
    schedule: null,
    activePlanningIds: [],
    hiddenEvents: []
  })
);

export const persist = persistState(scheduleStore, {
  key: STORE_NAME,
  storage: localForageStore,
});

export const schedule$ = scheduleStore.pipe(select((state) => state.schedule));

export const setSchedule = (schedule: ScheduleProps['schedule']) => {
  scheduleStore.update((state) => {

    const activePlanningIdsInSchedule = schedule.plannings
      .map(mapPlanningId)
      .filter(planningId => state.activePlanningIds.includes(planningId));
    const noActivePlanningIds = state.activePlanningIds.length === 0;
    const noActivePlanningIdsInSchedule = activePlanningIdsInSchedule.length === 0;
    const applyDefaultPlanning = noActivePlanningIds || noActivePlanningIdsInSchedule;

    const activePlanningIds = (applyDefaultPlanning) ?
      schedule.plannings
        .filter(filterDefaultPlanning)
        .map(mapPlanningId) :
      activePlanningIdsInSchedule;

    return {
      ...state,
      schedule,
      activePlanningIds
    };
  });
};

export const activePlanningIds$ = scheduleStore.pipe(select((state) => state.activePlanningIds));

export const setActivePlanningIds = (activePlanningIds: ScheduleProps['activePlanningIds']) => {
  scheduleStore.update((state) => ({
    ...state,
    activePlanningIds,
  }));
};

export const eventsFromActivePlannings$ = scheduleStore.pipe(select((state) =>
  state.schedule?.plannings?.filter(planning => state.activePlanningIds.includes(mapPlanningId(planning)))
    .reduce((events, planning) => events.concat(planning.events), [])
    .sort((a: Event, b: Event) => new Date(a.startDateTime).getTime() - new Date(b.startDateTime).getTime()) || []
));

export const hiddenEvents$ = scheduleStore.pipe(select((state) => state.hiddenEvents));

export const displayedEvents$ = combineLatest([eventsFromActivePlannings$, hiddenEvents$]).pipe(
  map(([storedEvents, hiddenEvents]) => {
    return storedEvents.filter(event => {
      // @TODO supprimer la ligne suivante quand l'API de l'UL sera prête.
      event.id = event._adeEventId.toString();

      return  !hiddenEvents.some(hiddenEvent => hiddenEvent.id === event.id);
    });;
  }));

export const setHiddenEvents = (hiddenEvents: ScheduleProps['hiddenEvents']) => {
  scheduleStore.update((state) => ({
    ...state,
    hiddenEvents,
  }));
};
