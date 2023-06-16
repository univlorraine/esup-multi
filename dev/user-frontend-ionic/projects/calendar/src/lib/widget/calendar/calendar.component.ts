import { Component, OnInit } from '@angular/core';
import { CalendarService } from '../../calendar.service';
import { finalize, first } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { MailCalendarEvents } from '../../calendar.repository';

@Component({
  selector: 'app-calendar-widget',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.scss'],
})
export class CalendarComponent implements OnInit {
  public isLoading = false;
  public nextEvents$: Observable<MailCalendarEvents>;

  constructor(private calendarService: CalendarService) {
    this.nextEvents$ = this.calendarService.getNextEvents$();
  }

  ngOnInit(): void {
    this.isLoading = true;
    this.calendarService.loadCalendarIfNetworkAvailable()
      .pipe(
        first(),
        finalize(() => this.isLoading = false)
      )
      .subscribe();
  }
}
