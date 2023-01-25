import { Component, OnInit } from '@angular/core';
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
export class NextEventsComponent implements OnInit {

  public isLoading = false;
  public nextEvents$: Observable<Event[]>;
  public noNextEvents$: Observable<boolean>;

  constructor(
    private nextEventsService: NextEventsService,
    private scheduleService: ScheduleService,
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

}
