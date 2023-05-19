import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { finalize, first, map } from 'rxjs/operators';
import { CompleteLocalDatePipe } from '../../common/pipe/complete-local-date.pipe';
import { Event } from '../../schedule.repository';
import { ScheduleService } from '../../schedule.service';
import { NextEventsService } from './next-events.service';

@Component({
  selector: 'app-schedule-widget-next-events',
  templateUrl: './next-events.component.html',
  styleUrls: ['./next-events.component.scss'],
})
export class NextEventsComponent implements OnInit {

  public isLoading = false;
  public nextEvents$: Observable<Event[]>;
  public noNextEvents$: Observable<boolean>;
  private previousEventDay: string;

  constructor(
    private nextEventsService: NextEventsService,
    private scheduleService: ScheduleService,
    private completeLocalDatePipe: CompleteLocalDatePipe
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
  }

  // Display the day date if the event day is different from the previous event
  shouldDisplayDay(event: Event): boolean {
    const eventDay = this.completeLocalDatePipe.transform(event.startDateTime);
    const displayDate = eventDay !== this.previousEventDay;
    this.previousEventDay = eventDay;

    return displayDate;
  }
}
