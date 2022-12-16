import { Component, OnDestroy, ViewChild } from '@angular/core';
import { Calendar, CalendarOptions } from '@fullcalendar/core';
import { FullCalendarComponent } from '@fullcalendar/angular';
import dayGridPlugin from '@fullcalendar/daygrid';
import allLocales from '@fullcalendar/core/locales-all';
import { currentLanguage$ } from '@ul/shared';
import { Observable, Subscription } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-schedule-calendar',
  templateUrl: './schedule-calendar.component.html',
  styleUrls: ['./schedule-calendar.component.scss'],
})
export class ScheduleCalendarComponent implements OnDestroy, OnDestroy {

  @ViewChild('calendar') calendarComponent: FullCalendarComponent;

  calendarOptions: CalendarOptions = {
    plugins: [dayGridPlugin],
    viewHeight: 'auto',
    locales: allLocales,
  };

  private subscriptions: Subscription[] = [];
  private viewType$: Observable<string>;

  constructor(private route: ActivatedRoute) {
    this.viewType$ = this.route.fragment
    .pipe(
      filter(f => f !== null)
    );
  }

  ngOnDestroy() {
    this.subscriptions.forEach(subscription => subscription.unsubscribe());
  }

  ionViewDidEnter() {
    this.subscriptions.push(
      this.viewType$.subscribe(viewType => this.changeViewType(viewType))
    );
    this.initCalendar();
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

  private changeViewType(viewType: string) {
    if(!this.getCalendar()) {
      return;
    }
    this.getCalendar().changeView(this.getCalendarView(viewType));
  }

  private getCalendarView(viewType: string) {
    switch(viewType) {
      case 'day':
        return 'dayGridDay';
      case 'week':
        return 'dayGridWeek';
      default:
        return 'dayGridMonth';
    }
  }

  private getCalendar(): Calendar {
    return this.calendarComponent?.getApi();
  }
}
