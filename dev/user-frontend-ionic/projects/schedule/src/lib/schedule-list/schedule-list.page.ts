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

import { Component, ViewChild } from '@angular/core';
import { IonContent } from '@ionic/angular';
import { AuthenticatedUser } from '@ul/shared';
import { add, isAfter, startOfWeek } from 'date-fns';
import { combineLatest, Observable, of, Subscription } from 'rxjs';
import { map, switchMap, tap } from 'rxjs/operators';
import {
  impersonatedScheduleStoreManager,
  Schedule,
  scheduleStoreManager,
  ScheduleStoreManager
} from '../schedule.repository';
import { formatDay, ScheduleService } from '../schedule.service';
import { EventsByDay, ScheduleListService } from './schedule-list.service';

@Component({
  selector: 'app-schedule-list',
  templateUrl: './schedule-list.page.html',
  styleUrls: ['../../../../../src/theme/app-theme/schedule/schedule-list.page.scss'],
})
export class ScheduleListPage {

  @ViewChild('scrollContent') content: IonContent;

  public authenticatedUser$: Observable<AuthenticatedUser>;
  public areEventsFromActivePlannings$: Observable<boolean>;
  public eventsByDays$: Observable<EventsByDay[]>;
  public currentDay: string;
  public viewStartDate: Date;
  public viewEndDate: Date;
  public storeManager: ScheduleStoreManager = scheduleStoreManager;
  private subscriptions: Subscription[] = [];

  constructor(
    private scheduleListService: ScheduleListService,
    private scheduleService: ScheduleService,
  ) { }

  async ionViewWillEnter() {
    const now = new Date();
    this.currentDay = formatDay(now);
    this.viewStartDate = startOfWeek(now, { weekStartsOn: 1 });
    this.viewEndDate = this.scheduleService.getStateEndDate();

    this.subscriptions.push(
      this.scheduleService.asUser.pipe(
        tap(() => this.storeManager = this.scheduleService.getStoreManager()),
        switchMap(() => this.storeManager.eventsFromActivePlannings$),
        map(eventList => eventList.length > 0)
      ).subscribe(result => {
        this.areEventsFromActivePlannings$ = of(result);
        this.eventsByDays$ = this.scheduleListService.loadEventsByDays(this.viewStartDate, this.viewEndDate);
      }),

      combineLatest([
        scheduleStoreManager.schedule$,
        impersonatedScheduleStoreManager.schedule$,
        this.scheduleService.asUser
      ]).subscribe(() => {
        setTimeout(() => {
          this.scrollToCurrentDate();
        }, 300);
      })
    );

    this.subscriptions.push(this.scheduleListService.showEventEvt.subscribe(() => {
      this.keepScrollPosition();
    }));

    this.subscriptions.push(this.scheduleService.hideEventEvt.subscribe(() => {
      this.keepScrollPosition();
    }));
  }

  ionViewWillLeave() {
    this.subscriptions?.forEach(subscription => subscription.unsubscribe());
  }

  scrollToCurrentDate() {
    const element = document.getElementById(this.currentDay);
    if (!element) {
      return;
    }

    element.classList.add('current-date');

    const y = element.offsetTop;
    this.content.scrollToPoint(0, y);
  }

  async keepScrollPosition(scrollPosition?: number) {
    if (!scrollPosition) {
      scrollPosition = (await this.content.getScrollElement()).scrollTop;
    }
    setTimeout(() => {
      this.content.scrollToPoint(0, scrollPosition);
    }, 0);
  }

  async loadMoreEvents() {
    const endDateToLoad = add(this.viewEndDate, { days: 7 });
    const scrollPosition = (await this.content.getScrollElement()).scrollTop;

    let outOfStateSchedule: Schedule;

    if (isAfter(endDateToLoad, this.scheduleService.getStateEndDate())) {
      const nextDateAfterStateEndDate = add(this.scheduleService.getStateEndDate(), { days: 1 });
      outOfStateSchedule = await this.scheduleService
        .loadScheduleOutOfStateInterval(formatDay(nextDateAfterStateEndDate), formatDay(endDateToLoad)).toPromise();
    }

    this.eventsByDays$ = this.scheduleListService.loadEventsByDays(this.viewStartDate, endDateToLoad, outOfStateSchedule);

    await this.keepScrollPosition(scrollPosition);
    this.viewEndDate = endDateToLoad;

  }
}
