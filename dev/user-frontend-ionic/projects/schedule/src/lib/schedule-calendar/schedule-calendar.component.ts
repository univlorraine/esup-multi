import { Component, Inject, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FullCalendarComponent } from '@fullcalendar/angular';
import { Calendar, CalendarOptions } from '@fullcalendar/core';
import allLocales from '@fullcalendar/core/locales-all';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import { IonModal, Platform } from '@ionic/angular';
import { TranslateService } from '@ngx-translate/core';
import { format, isAfter, isBefore, sub } from 'date-fns';
import * as locale from 'date-fns/locale';
import { EventInput } from 'fullcalendar';
import { Observable, Subscription } from 'rxjs';
import { filter, first, map, mergeMap, tap } from 'rxjs/operators';
import { currentLanguage$ } from '@ul/shared';
import {
  Event,
  impersonatedScheduleStoreManager,
  Schedule,
  scheduleStoreManager,
  ScheduleStoreManager
} from '../schedule.repository';
import { formatDay, ScheduleService } from '../schedule.service';
import { ScheduleCalendarService } from './schedule-calendar.service';

const defaultBreakpoint = 0.60;

@Component({
  selector: 'app-schedule-calendar',
  templateUrl: './schedule-calendar.component.html',
  styleUrls: ['./schedule-calendar.component.scss'],
})
export class ScheduleCalendarComponent {

  @ViewChild('calendar') calendarComponent: FullCalendarComponent;
  @ViewChild('modal') modal: IonModal;

  public viewType$: Observable<string>;
  public viewType: string;
  public isEventDetailOpen = false;
  public selectedEvent: Event;
  public loadScheduleOutOfStateError = false;
  public dateError: string;
  public errorIsBefore: boolean;
  public calendarDisplaySomeDateOutOfState: boolean;
  public initialBreakpoint: number;
  public storeManager: ScheduleStoreManager = scheduleStoreManager;
  public calendarOptions: CalendarOptions = {
    plugins: [timeGridPlugin, dayGridPlugin],
    height: '100%',
    locales: allLocales,
    allDaySlot: false,
    slotEventOverlap: false,
    showNonCurrentDates: false,
    slotMinTime: '06:00:00',
    slotMaxTime: '22:00:00',
    scrollTime: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    nowIndicator: true,
    firstDay: 1,
    views: {
      timeGridWeek: {
        dayHeaderContent: (args) => {
          const lang = this.translate.currentLang || this.translate.defaultLang;
          return {
            html: `
            <div class="week-view-column-header-day">${format(args.date, 'EEE', { locale: locale[lang] })}</div>
            <div class="week-view-column-header-number">${format(args.date, 'd', { locale: locale[lang] })}</div>
            `
          };
        },
      }
    },
    eventClick: info => {
      this.selectedEvent = info.event.extendedProps.event;
      this.isEventDetailOpen = true;
    },
    events: (fetchInfo, successCallback) => {
      this.loadScheduleOutOfStateError = false;
      fetchInfo.end = sub(fetchInfo.end, { days: 1 });

      this.calendarDisplaySomeDateOutOfState = isBefore(fetchInfo.start, this.scheduleService.getStateStartDate())
        || isAfter(fetchInfo.end, this.scheduleService.getStateEndDate());

      if (!this.calendarDisplaySomeDateOutOfState) {
        this.storeManager.displayedEvents$.pipe(
          first(),
          map((events: Event[]) => this.scheduleCalendarService.eventsToCalendarEvents(events))
        ).subscribe((events: EventInput[]) => successCallback(events));
        return;

      }

      this.scheduleService.loadScheduleOutOfStateInterval(formatDay(fetchInfo.start), formatDay(fetchInfo.end))
        .pipe(
          mergeMap((outOfStateSchedule: Schedule) => this.scheduleService.outOfStateScheduleToDisplayedEvents(outOfStateSchedule)),
          first(),
          map((events: Event[]) => this.scheduleCalendarService.eventsToCalendarEvents(events))
        )
        .subscribe(
          (events: EventInput[]) => successCallback(events),
          () => {

            if (this.calendarDisplaySomeDateOutOfState) {
              this.loadScheduleOutOfStateError = true;

              if (isBefore(fetchInfo.start, this.scheduleService.getStateStartDate())) {
                this.errorIsBefore = true;
                this.dateError = formatDay(this.scheduleService.getStateStartDate());
              } else {
                this.errorIsBefore = false;
                this.dateError = formatDay(this.scheduleService.getStateEndDate());
              }
            }

            this.storeManager.displayedEvents$.pipe(
              first(),
              map((events: Event[]) => this.scheduleCalendarService.eventsToCalendarEvents(events))
            ).subscribe((events: EventInput[]) => successCallback(events));
          }
        );
    }
  };
  private subscriptions: Subscription[] = [];

  constructor(
    @Inject('environment')
    private environment: any,
    private route: ActivatedRoute,
    private scheduleCalendarService: ScheduleCalendarService,
    private scheduleService: ScheduleService,
    public platform: Platform,
    private translate: TranslateService) {
    this.viewType$ = this.route.fragment
      .pipe(
        filter(f => f !== null)
      );
  }

  async ionViewDidEnter() {
    this.initCalendar();

    this.subscriptions.push(
      this.subscribeToViewType(),
      this.subscribeToDisplayedEvents(scheduleStoreManager),
      this.subscribeToDisplayedEvents(impersonatedScheduleStoreManager),
      this.subscribeToAsUser(),
      this.subscribeToHideEvent(),
      this.subscribeToResizeScreen()
    );
  }

  ionViewDidLeave() {
    this.subscriptions.forEach(subscription => subscription.unsubscribe());
  }

  initCalendar() {
    this.subscriptions.push(
      currentLanguage$.subscribe(lang => {

        if (!lang) {
          this.getCalendar().setOption('locale', this.environment.defaultLanguage);
        } else {
          this.getCalendar().setOption('locale', lang);
        }

        this.getCalendar().setOption('buttonText', { today: this.translate.instant('SCHEDULE.CALENDAR.TODAY_ABBREVIATION') });

        // fix a display bug from @fullcalendar/angular in Ionic
        setTimeout(
          () => window.dispatchEvent(new Event('resize'))
        );
      })
    );
  }

  dismissModal() {
    this.isEventDetailOpen = false;
  }

  private changeViewType(viewType: string) {
    if (!this.getCalendar()) {
      return;
    }
    this.getCalendar().changeView(this.getCalendarView(viewType));
  }

  private getCalendarView(viewType: string) {
    switch (viewType) {
      case 'day':
        return 'timeGridDay';
      case 'week':
        return 'timeGridWeek';
      default:
        return 'dayGridMonth';
    }
  }

  private getCalendar(): Calendar {
    return this.calendarComponent?.getApi();
  }

  private updateBreakpoints() {
    const isLandscape = this.platform.isLandscape();
    const isDesktop = this.platform.is('desktop');

    const breakpoint = (isDesktop || !isLandscape) ? defaultBreakpoint : 1;

    requestAnimationFrame(() => {
      this.modal.initialBreakpoint = breakpoint;
      this.modal.setCurrentBreakpoint(breakpoint);
    });
  }

  private subscribeToViewType(): Subscription {
    return this.viewType$.subscribe(viewType => {
      this.viewType = viewType;
      this.changeViewType(viewType);
    });
  }

  private subscribeToDisplayedEvents(storeManager: ScheduleStoreManager): Subscription {
    return storeManager.displayedEvents$.pipe(
      tap(() => this.getCalendar()?.refetchEvents())
    ).subscribe();
  }

  private subscribeToAsUser(): Subscription {
    return this.scheduleService.asUser.pipe(
      tap(() => this.storeManager = this.scheduleService.getStoreManager())
    ).subscribe(() => this.getCalendar()?.refetchEvents());
  }

  private subscribeToHideEvent(): Subscription {
    return this.scheduleService.hideEventEvt.subscribe(() => this.dismissModal());
  }

  private subscribeToResizeScreen(): Subscription {
    return this.platform.resize.subscribe(() => this.updateBreakpoints());
  }
}
