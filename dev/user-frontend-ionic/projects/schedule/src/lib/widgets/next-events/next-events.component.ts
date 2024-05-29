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

import { AfterViewInit, ChangeDetectorRef, Component, Inject, Input, OnDestroy, TemplateRef, ViewChild } from '@angular/core';
import { CompleteLocalDatePipe, ThemeService } from '@multi/shared';
import { Observable, Subscription } from 'rxjs';
import { finalize, map, take } from 'rxjs/operators';
import { Event } from '../../schedule.repository';
import { ScheduleService } from '../../schedule.service';
import { NextEventsService } from './next-events.service';
import { SCHEDULE_CONFIG, ScheduleModuleConfig } from '../../schedule.config';

@Component({
  selector: 'app-schedule-widget-next-events',
  templateUrl: './next-events.component.html',
  styleUrls: ['../../../../../../src/theme/app-theme/styles/schedule/next-events.component.scss'],
})
export class NextEventsComponent implements OnDestroy, AfterViewInit {

  @Input() widgetColor: string;
  @ViewChild('list') list: TemplateRef<any>;
  @ViewChild('slider') slider: TemplateRef<any>;

  public isLoading = false;
  public nextEvents$: Observable<Event[]>;
  public noNextEvents$: Observable<boolean>;
  public displayDateForIds: string[];
  private nextEventsSubscription: Subscription;

  constructor(
    private nextEventsService: NextEventsService,
    private scheduleService: ScheduleService,
    private completeLocalDatePipe: CompleteLocalDatePipe,
    private themeService: ThemeService,
    private changeDetectorRef: ChangeDetectorRef,
    @Inject(SCHEDULE_CONFIG) private config: ScheduleModuleConfig
  ) {
    this.nextEvents$ = this.nextEventsService.getNextEvents$().pipe();

    // If two events occurs the same day, we only want to display the date once
    // below we update an array to know for which event we want to show the date
    this.nextEventsSubscription = this.nextEvents$.subscribe(events => {
      const idsToDisplay = {};
      events.forEach(event => {
        const eventDay = this.completeLocalDatePipe.transform(event.startDateTime);
        if(!idsToDisplay[eventDay]) {
          idsToDisplay[eventDay] = event.id;
        }
      });
      this.displayDateForIds = Object.values(idsToDisplay);
    });

    this.noNextEvents$ = this.nextEvents$.pipe(
      map(events => !events || events.length === 0)
    );
  }

  widgetViewDidEnter(): void {
    this.isLoading = true;
    this.scheduleService.loadScheduleToState().pipe(
      take(1),
      finalize(() => this.isLoading = false)
    ).subscribe();

    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)');
    prefersDark.removeEventListener('change', (mediaQuery) => this.changeDetectorRef.detectChanges());
    prefersDark.addEventListener('change', (mediaQuery) => this.changeDetectorRef.detectChanges());
  }

  ngAfterViewInit() {
    this.changeDetectorRef.detectChanges();
  }

  fontColor() {
    return this.themeService.isBackgroundFromCmsDarkOrIsDarkTheme(this.widgetColor) ?
      'light-font-color' : 'dark-font-color';
  }

  ngOnDestroy() {
    this.nextEventsSubscription.unsubscribe();
  }

  getTemplateRef(): TemplateRef<any> {
    return this[this?.config.nextEventsWidget.display];
  }
}

