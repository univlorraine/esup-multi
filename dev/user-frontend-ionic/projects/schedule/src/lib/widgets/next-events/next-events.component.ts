import { AfterViewInit, ChangeDetectorRef, Component, Input, OnInit, OnDestroy } from '@angular/core';
import { CompleteLocalDatePipe, ThemeService } from '@ul/shared';
import { Observable, Subscription } from 'rxjs';
import { finalize, first, map } from 'rxjs/operators';
import { Event } from '../../schedule.repository';
import { ScheduleService } from '../../schedule.service';
import { NextEventsService } from './next-events.service';

@Component({
  selector: 'app-schedule-widget-next-events',
  templateUrl: './next-events.component.html',
  styleUrls: ['./next-events.component.scss'],
})
export class NextEventsComponent implements OnInit, OnDestroy, AfterViewInit {

  @Input() widgetColor: string;

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
    private changeDetectorRef: ChangeDetectorRef
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

  fontColor() {
    return this.themeService.isBackgroundFromCmsDarkOrIsDarkTheme(this.widgetColor) ?
      'light-font-color' : 'dark-font-color';
  }

  ngOnDestroy() {
    this.nextEventsSubscription.unsubscribe();
  }
}

