import { createStore, select, Store, withProps } from '@ngneat/elf';
import { persistState } from '@ngneat/elf-persist-state';
import { combineLatest, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { localForageStore } from '@ul/shared';

const STORE_NAME = 'schedule';
const STORE_NAME_2 = 'impersonated-schedule';

/* ******************************************************
 * Interfaces
 ****************************************************** */
export interface ScheduleProps {
  schedule: Schedule;
  activePlanningIds: string[];
  hiddenCourseList: HiddenCourse[];
}
export interface Schedule {
  messages: [Message?];
  plannings?: Planning[];
}
export interface Message {
  level: string;
  code: string;
  text: string;
}
export interface Planning {
  id: string;
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
}
export interface Event {
  id: string;
  startDateTime: string;
  endDateTime: string;
  course: Course;
  rooms: [
    {
      id: string;
      label: string;
      type: string;
      building: string;
    }
  ];
  teachers: [
    {
      id: string;
      displayname: string;
      email: string;
    }
  ];
  groups: [
    {
      id: string;
      label: string;
    }
  ];
}
export interface Course {
  id: string;
  label: string;
  color: string;
  type: string;
  online: boolean;
  url?: string;
}
export interface HiddenCourse {
  id: string;
  title: string;
}
export interface SelectedPlanningProps {
  selectedPlanning: string[];
}

/* ******************************************************
 * Filters
 ****************************************************** */
const filterDefaultPlanning = (planning: Planning): boolean => planning.default === true;
const mapPlanningId = (planning: Planning): string => planning.id;

/* ******************************************************
 * Store Manager
 ****************************************************** */
export class ScheduleStoreManager {
  public schedule$: Observable<Schedule>;                   // Ensemble des plannings de l'utilisateur
  public activePlanningIds$: Observable<string[]>;          // ids des plannings marqués comme actifs
  public eventsFromActivePlannings$: Observable<Event[]>;   // Tous les events des plannings actifs
  public hiddenCourseList$: Observable<HiddenCourse[]>;     // Liste des cours masqués par l'utilisateur
  public displayedEvents$: Observable<Event[]>;             // Events à afficher (= eventsFromActivePlannings$ - hiddenCourseList$)
  private store: Store;

  constructor(private storeName: string) {
    this.store = this.createStore(storeName);
    this.schedule$ = this.getSchedule();
    this.activePlanningIds$ = this.getActivePlanningIds();
    this.eventsFromActivePlannings$ = this.getEventsFromActivePlannings();
    this.hiddenCourseList$ = this.getHiddenCourseList();
    this.displayedEvents$ = this.getDisplayedEvents();
  }

  public setSchedule(schedule: ScheduleProps['schedule']) {
    this.store.update((state) => {
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
  }

  public setActivePlanningIds(activePlanningIds: ScheduleProps['activePlanningIds']) {
    this.store.update((state: ScheduleProps) => ({
      ...state,
      activePlanningIds,
    }));
  }

  public setHiddenCourseList(hiddenCourseList: ScheduleProps['hiddenCourseList']) {
    this.store.update((state: ScheduleProps) => ({
      ...state,
      hiddenCourseList,
    }));
  }
  public resetStore() {
    this.store.update(() => ({
      schedule: null,
      activePlanningIds: [],
      hiddenCourseList: []
    }));
  }

  public persistStore(storeName: string) {
    persistState(this.store, { key: storeName, storage: localForageStore });
  }

  private createStore(storeName: string): Store {
    return createStore(
      { name: storeName },
      withProps<ScheduleProps>({
        schedule: null,
        activePlanningIds: [],
        hiddenCourseList: []
      })
    );
  }

  private getSchedule(): Observable<Schedule> {
    return this.store.pipe(select((state: ScheduleProps) => state.schedule));
  }

  private getActivePlanningIds(): Observable<string[]> {
    return this.store.pipe(select((state: ScheduleProps) => state.activePlanningIds));
  }

  private getEventsFromActivePlannings(): Observable<Event[]> {
    return this.store.pipe(select((state: ScheduleProps) => {
      const eventIds = [];
      return state.schedule?.plannings?.filter(planning => state.activePlanningIds.includes(mapPlanningId(planning)))
        .reduce((events, planning) => {
          planning.events.forEach(event => {
            /* eslint-enable no-underscore-dangle */
            if (!eventIds.includes(event.id)) {
              eventIds.push(event.id);
              events.push(event);
            }
          });
          return events;
        }, [])
        .sort((a: Event, b: Event) => new Date(a.startDateTime).getTime() - new Date(b.startDateTime).getTime()) || [];
    }));
  }

  private getHiddenCourseList(): Observable<HiddenCourse[]> {
    return this.store.pipe(select((state: ScheduleProps) => state.hiddenCourseList));
  }

  private getDisplayedEvents(): Observable<Event[]> {
    return combineLatest([this.eventsFromActivePlannings$, this.hiddenCourseList$])
      .pipe(
        map(([storedEvents, hiddenCourses]) =>
          storedEvents.filter(event => !hiddenCourses
            .some(hiddenCourse => hiddenCourse.id === event.course.id)
          )
        ));
  }
}

// Store pour l'EDT de l'utilisateur
export const scheduleStoreManager = new ScheduleStoreManager(STORE_NAME);
scheduleStoreManager.persistStore(STORE_NAME);

// Store pour l'EDT d'une personne tierce
export const impersonatedScheduleStoreManager = new ScheduleStoreManager(STORE_NAME_2);
impersonatedScheduleStoreManager.persistStore(STORE_NAME_2);
