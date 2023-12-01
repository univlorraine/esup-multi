/*
 * Copyright ou © ou Copr. Université de Lorraine, (2022)
 *
 * Direction du Numérique de l'Université de Lorraine - SIED
 *  (dn-mobile-dev@univ-lorraine.fr)
 * JNESIS (contact@jnesis.com)
 *
 * Ce logiciel est un programme informatique servant à rendre accessible
 * sur mobile divers services universitaires aux étudiants et aux personnels
 * de l'université.
 *
 * Ce logiciel est régi par la licence CeCILL 2.1, soumise au droit français
 * et respectant les principes de diffusion des logiciels libres. Vous pouvez
 * utiliser, modifier et/ou redistribuer ce programme sous les conditions
 * de la licence CeCILL telle que diffusée par le CEA, le CNRS et INRIA
 * sur le site "http://cecill.info".
 *
 * En contrepartie de l'accessibilité au code source et des droits de copie,
 * de modification et de redistribution accordés par cette licence, il n'est
 * offert aux utilisateurs qu'une garantie limitée. Pour les mêmes raisons,
 * seule une responsabilité restreinte pèse sur l'auteur du programme, le
 * titulaire des droits patrimoniaux et les concédants successifs.
 *
 * À cet égard, l'attention de l'utilisateur est attirée sur les risques
 * associés au chargement, à l'utilisation, à la modification et/ou au
 * développement et à la reproduction du logiciel par l'utilisateur étant
 * donné sa spécificité de logiciel libre, qui peut le rendre complexe à
 * manipuler et qui le réserve donc à des développeurs et des professionnels
 * avertis possédant des connaissances informatiques approfondies. Les
 * utilisateurs sont donc invités à charger et à tester l'adéquation du
 * logiciel à leurs besoins dans des conditions permettant d'assurer la
 * sécurité de leurs systèmes et/ou de leurs données et, plus généralement,
 * à l'utiliser et à l'exploiter dans les mêmes conditions de sécurité.
 *
 * Le fait que vous puissiez accéder à cet en-tête signifie que vous avez
 * pris connaissance de la licence CeCILL 2.1, et que vous en avez accepté les
 * termes.
 */

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
