import { AfterViewInit, ChangeDetectorRef, Component, Input, OnInit } from '@angular/core';
import { CompleteLocalDatePipe, ThemeService } from '@ul/shared';
import { Observable } from 'rxjs';
import { finalize, first, map } from 'rxjs/operators';
import { Event } from '../../schedule.repository';
import { ScheduleService } from '../../schedule.service';
import { NextEventsService } from './next-events.service';

@Component({
  selector: 'app-schedule-widget-next-events',
  templateUrl: './next-events.component.html',
  styleUrls: ['./next-events.component.scss'],
})
export class NextEventsComponent implements OnInit, AfterViewInit {

  @Input() widgetColor: string;

  public isLoading = false;
  public nextEvents$: Observable<Event[]>;
  public noNextEvents$: Observable<boolean>;
  private previousEventDay: string;

  constructor(
    private nextEventsService: NextEventsService,
    private scheduleService: ScheduleService,
    private completeLocalDatePipe: CompleteLocalDatePipe,
    private themeService: ThemeService,
    private changeDetectorRef: ChangeDetectorRef
  ) {
    this.nextEvents$ = this.nextEventsService.getNextEvents$().pipe();
    this.noNextEvents$ = this.nextEvents$.pipe(
      map(events => !events || events.length === 0)
    );
  }

  ngOnInit(): void {
    this.isLoading = true;
    this.scheduleService.loadScheduleToState().pipe(
      first(),
      finalize(() => this.isLoading = false)
    ).subscribe();

    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)');
    prefersDark.removeEventListener('change', (mediaQuery) => this.changeDetectorRef.detectChanges());
    prefersDark.addEventListener('change', (mediaQuery) => this.changeDetectorRef.detectChanges());
  }

  ngAfterViewInit() {
    this.changeDetectorRef.detectChanges();
  }

  // Display the day date if the event day is different from the previous event
  shouldDisplayDay(event: Event): boolean {
    const eventDay = this.completeLocalDatePipe.transform(event.startDateTime);
    const displayDate = eventDay !== this.previousEventDay;
    this.previousEventDay = eventDay;

    return displayDate;
  }

  fontColor() {
    return this.themeService.isBackgroundFromCmsDarkOrIsDarkTheme(this.widgetColor) ?
      'light-font-color' : 'dark-font-color';
  }
}

