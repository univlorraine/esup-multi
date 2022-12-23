import { Component, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FullCalendarComponent } from '@fullcalendar/angular';
import { Calendar, CalendarOptions } from '@fullcalendar/core';
import allLocales from '@fullcalendar/core/locales-all';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import { currentLanguage$ } from '@ul/shared';
import { Observable, Subscription } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { activePlanningList$ } from '../schedule.repository';
import { Event } from './../schedule.repository';

@Component({
  selector: 'app-schedule-calendar',
  templateUrl: './schedule-calendar.component.html',
  styleUrls: ['./schedule-calendar.component.scss'],
})
export class ScheduleCalendarComponent {

  @ViewChild('calendar') calendarComponent: FullCalendarComponent;

  public viewType$: Observable<string>;
  public isEventDetailOpen = false;
  public selectedEvent: Event;
  public calendarOptions: CalendarOptions = {
    plugins: [timeGridPlugin, dayGridPlugin],
    height: '100%',
    locales: allLocales,
    allDaySlot: false,
    slotEventOverlap: false,
    eventClick: info => {
      this.selectedEvent = info.event.extendedProps.event;
      this.isEventDetailOpen = true;
    }
  };
  private subscriptions: Subscription[] = [];

  constructor(private route: ActivatedRoute) {
    this.viewType$ = this.route.fragment
      .pipe(
        filter(f => f !== null)
      );
  }

  ionViewDidEnter() {

    this.initCalendar();

    this.subscriptions.push(this.viewType$.subscribe(viewType => {
      this.changeViewType(viewType);
    }));

    this.subscriptions.push(activePlanningList$.pipe(
      map(activePlanningList =>
        activePlanningList.reduce(
          (events, planning) => events.concat(planning.events),
          []
        )
      )
    ).subscribe(events => {
        this.getCalendar().removeAllEvents();
        events.forEach(event => this.addEventToCalendar(event));
      }));
  }

  ionViewDidLeave() {
    this.subscriptions.forEach(subscription => subscription.unsubscribe());
  }

  addEventToCalendar(event: Event) {
    this.getCalendar().addEvent({
      start: event.startDateTime,
      end: event.endDateTime,
      backgroundColor: event.course.color,
      extendedProps: {
        event
      }
    });
  }

  initCalendar() {
    this.subscriptions.push(
      currentLanguage$.subscribe(lang => {
        this.getCalendar().setOption('locale', lang);

        // fix a display bug from @fullcalendar/angular in Ionic
        setTimeout(
          () => window.dispatchEvent(new Event('resize'))
        );
      })
    );
  }

  onModalWillDismiss() {
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

}
