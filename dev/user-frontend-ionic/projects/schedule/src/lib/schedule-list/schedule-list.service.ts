import { Injectable } from '@angular/core';
import { add, eachDayOfInterval, Interval, isAfter } from 'date-fns';
import { Observable, Subject } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';
import { displayedEvents$, Event, Schedule } from '../schedule.repository';
import { formatDay } from '../schedule.service';
import { ScheduleService } from './../schedule.service';

export interface EventsByDay {
  day: string;
  events: Event[];
}

@Injectable({
  providedIn: 'root'
})
export class ScheduleListService {

  public showEventEvt = new Subject();

  constructor(private scheduleService: ScheduleService) { }

  eventsToEventsByDay(events: Event[], dateInterval: Interval): EventsByDay[] {

    if (events.length === 0) {
      return [];
    }

    const days = eachDayOfInterval(dateInterval);

    const eventsMapByDay = events
      .reduce((accumulatorEventsMapByDay, event) => {
        const day = formatDay(new Date(event.startDateTime));

        if (!accumulatorEventsMapByDay.has(day)) {
          accumulatorEventsMapByDay.set(day, []);
        }

        accumulatorEventsMapByDay.get(day).push(event);

        return accumulatorEventsMapByDay;
      }, new Map<string, Event[]>());

    return days
      .map(date => formatDay(date))
      .map(day => ({
        day,
        events: eventsMapByDay.has(day) ?
          eventsMapByDay.get(day) :
          []
      })
      );
  }


  loadEventsByDays(viewStartDate, endDateToLoad, outOfStateSchedule?: Schedule): Observable<EventsByDay[]> {

    const intervalViewForStateEvents = { start: viewStartDate, end: this.scheduleService.getStateEndDate() };

    if (isAfter(endDateToLoad, this.scheduleService.getStateEndDate())) {

      const nextDateAfterStateEndDate = add(this.scheduleService.getStateEndDate(), { days: 1 });
      const outOfStateInterval = { start: nextDateAfterStateEndDate, end: endDateToLoad };

      return displayedEvents$.pipe(
        map(events => this.eventsToEventsByDay(events, intervalViewForStateEvents)),
        switchMap(stateEventsByDay => this.scheduleService.outOfStateScheduleToDisplayedEvents(outOfStateSchedule).pipe(
            map(events => {
              const outOfStateEventsByDay = this.eventsToEventsByDay(events, outOfStateInterval);

              return [...stateEventsByDay, ...outOfStateEventsByDay];
            }
            )
          )
        )
      );

    } else {

      return displayedEvents$.pipe(
        map(events => {
          const dateInterval = { start: viewStartDate, end: endDateToLoad };

          return this.eventsToEventsByDay(events, dateInterval);
        }));

    }
  }

  emitShowEventEvt() {
    this.showEventEvt.next();
  }
}
