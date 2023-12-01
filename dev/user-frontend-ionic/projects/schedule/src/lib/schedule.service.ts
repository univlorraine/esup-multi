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

import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { getAuthToken, NetworkService } from '@ul/shared';
import { add, format, startOfWeek, sub } from 'date-fns';
import { BehaviorSubject, combineLatest, from, Observable, of, Subject } from 'rxjs';
import { filter, finalize, map, mergeMap, switchMap, take, tap } from 'rxjs/operators';
import { ScheduleModuleConfig, SCHEDULE_CONFIG } from './schedule.config';
import {
  Event,
  HiddenCourse,
  impersonatedScheduleStoreManager,
  Schedule,
  ScheduleStoreManager,
  scheduleStoreManager
} from './schedule.repository';

export const formatDay = (date: Date) => format(date, 'yyyy-MM-dd');

@Injectable({
  providedIn: 'root'
})
export class ScheduleService {

  public isLoading$: Observable<boolean>;
  public hideEventEvt: Subject<void> = new Subject();
  public asUser: BehaviorSubject<string> = new BehaviorSubject<string | null>(null);
  private storeManager: ScheduleStoreManager = scheduleStoreManager;
  private isLoadingSubject = new Subject<boolean>();

  constructor(
    @Inject('environment')
    private environment: any,
    private http: HttpClient,
    @Inject(SCHEDULE_CONFIG) private config: ScheduleModuleConfig,
    private networkService: NetworkService,
  ) {
    this.isLoading$ = this.isLoadingSubject.asObservable();
    this.asUser.subscribe(() => {
      this.storeManager = this.getStoreManager();
    });
  }

  public getStoreManager(): ScheduleStoreManager {
    return this.asUser.value ? impersonatedScheduleStoreManager : scheduleStoreManager;
  }

  public getSchedule(authToken: string, startDate: string, endDate: string): Observable<Schedule> {

    const url = `${this.environment.apiEndpoint}/schedule`;
    const data = {
      authToken,
      startDate,
      endDate,
      asUser: this.asUser.value
    };

    return this.http.post<Schedule>(url, data);
  }

  loadSchedule(startDate: string, endDate: string): Observable<Schedule> {

    return from(this.networkService.getConnectionStatus()).pipe(
      filter(status => status.connected),
      tap(() => this.isLoadingSubject.next(true)),
      mergeMap(() => getAuthToken().pipe(
        take(1),
        filter(authToken => authToken != null),
        switchMap(authToken =>
          this.getSchedule(
            authToken,
            startDate,
            endDate
          )
        )
      )),
      finalize(() => this.isLoadingSubject.next(false))
    );
  }

  loadScheduleToState(): Observable<Schedule> {
    return this.loadSchedule(formatDay(this.getStateStartDate()), formatDay(this.getStateEndDate())).pipe(
      tap(schedule => this.storeManager.setSchedule(schedule))
    );
  }

  loadScheduleOutOfStateInterval(startDate: string, endDate: string): Observable<Schedule> {
    return this.loadSchedule(startDate, endDate);
  }

  getStateStartDate(): Date {
    return sub(this.getStartOfCurrentWeek(), { weeks: this.config.previousWeeksInCache });
  }

  getStateEndDate(): Date {
    return add(this.getStartOfCurrentWeek(), { weeks: this.config.nextWeeksInCache });
  }

  getStartOfCurrentWeek(): Date {
    const now = new Date();
    return startOfWeek(now);
  }

  outOfStateScheduleToDisplayedEvents(schedule: Schedule): Observable<Event[]> {
    if (!schedule) {
       return of([]);
    }
    const eventIds = [];
    return combineLatest([this.storeManager.activePlanningIds$, this.storeManager.hiddenCourseList$]).pipe(
      map(([activePlanningIds, hiddenCourseList]: [string[], HiddenCourse[]]) =>
        schedule.plannings.filter(planning => activePlanningIds.includes(planning.id))
          .reduce((events, planning) => {
            planning.events.forEach(event => {
              if (!eventIds.includes(event.id)) {
                eventIds.push(event.id);
                events.push(event);
              }
            });
            return events;
          }, [])
          .sort((a: Event, b: Event) => new Date(a.startDateTime).getTime() - new Date(b.startDateTime).getTime())
          .filter((event: Event) => !hiddenCourseList.some(hiddenCourse => hiddenCourse.id === event.course.id)
          )),
    );
  }

  emitHideCourseEvt() {
    this.hideEventEvt.next();
  }

  setAsUser(asUser: string) {
    this.asUser.next(asUser);
  }
}
