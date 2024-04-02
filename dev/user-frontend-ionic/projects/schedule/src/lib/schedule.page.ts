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

import { Component, OnDestroy, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { take } from 'rxjs/operators';
import { ScheduleCalendarComponent } from './schedule-calendar/schedule-calendar.component';
import { impersonatedScheduleStoreManager } from './schedule.repository';
import { ScheduleService } from './schedule.service';

type ViewType = 'month' | 'week' | 'day' | 'list';

const DEFAULT_VIEW_TYPE: ViewType = 'month';

@Component({
  selector: 'app-schedule',
  templateUrl: './schedule.page.html',
  styleUrls: ['../../../../src/theme/app-theme/styles/schedule/schedule.page.scss'],
})
export class SchedulePage implements OnDestroy {

  @ViewChild(ScheduleCalendarComponent) calendarRef: ScheduleCalendarComponent;
  viewType: ViewType = DEFAULT_VIEW_TYPE;
  public isLoading$ = this.scheduleService.isLoading$;
  public asUser: string;

  constructor(
    private scheduleService: ScheduleService,
    private router: Router) { }

  onViewTypeChange(evt) {
    this.viewType = evt.detail.value;
  }

  ionViewDidEnter() {
    this.calendarRef?.initCalendar();
    this.scheduleService.loadScheduleToState().pipe(take(1)).subscribe();
    this.scheduleService.asUser.subscribe((asUser) => this.asUser = asUser);
  }

  ngOnDestroy() {
    this.clearAsUserLogin();
  }

  isTabActive(anchor: string): boolean {
    return this.router.routerState.snapshot.url.includes(anchor);
  }

  clearAsUserLogin() {
    this.asUser = null;
    this.scheduleService.setAsUser(null);
    impersonatedScheduleStoreManager.resetStore();
  }
}
