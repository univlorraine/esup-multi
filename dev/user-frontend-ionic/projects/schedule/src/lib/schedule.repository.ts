import { createStore, select, withProps } from '@ngneat/elf';
import {
  persistState
} from '@ngneat/elf-persist-state';
import { localForageStore } from '@ul/shared';

const STORE_NAME = 'schedule';

export interface ScheduleProps {
  schedule: Schedule;
  activePlanningIds: string[];
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
  // @TODO code: a retirer une fois l'api en place ______________________________________________
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
      activePlanningIds,
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

export const activePlanningList$ = scheduleStore.pipe(select((state) =>
  state.schedule?.plannings?.filter(
    planning => state.activePlanningIds.includes(mapPlanningId(planning))
  ) || []
));
