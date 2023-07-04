import { AfterViewInit, ChangeDetectorRef, Component, Input, OnInit } from '@angular/core';
import { ThemeService } from '@ul/shared';
import { Observable } from 'rxjs';
import { finalize, first } from 'rxjs/operators';
import { MailCalendarEvents } from '../../calendar.repository';
import { CalendarService } from '../../calendar.service';

@Component({
  selector: 'app-calendar-widget',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.scss'],
})
export class CalendarComponent implements OnInit, AfterViewInit {

  @Input() widgetColor: string;

  public isLoading = false;
  public nextEvents$: Observable<MailCalendarEvents>;

  constructor(private calendarService: CalendarService,
    private themeService: ThemeService,
    private changeDetectorRef: ChangeDetectorRef) {
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

  ngAfterViewInit() {
    this.changeDetectorRef.detectChanges();
  }

  fontColor() {
    return this.themeService.isBackgroundFromCmsDarkOrIsDarkTheme(this.widgetColor) ?
      'light-font-color' : 'dark-font-color';
  }
}
