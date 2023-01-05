import { Injectable } from '@angular/core';
import { add, eachDayOfInterval, Interval, isAfter } from 'date-fns';
import { Observable } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';
import { activePlanningList$, Event, Planning, Schedule } from '../schedule.repository';
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

  constructor(private scheduleService: ScheduleService) { }

  planningListToEventsByDay(planningList: Planning[], dateInterval: Interval): EventsByDay[] {

    if (planningList.length === 0) {
      return [];
    }

    const days = eachDayOfInterval(dateInterval);

    const eventsMapByDay = planningList
      .reduce((events, planning) => events.concat(planning.events), [])
      .sort((a: Event, b: Event) => new Date(a.startDateTime).getTime() - new Date(b.startDateTime).getTime())
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

      return activePlanningList$.pipe(
        map(planningList => this.planningListToEventsByDay(planningList, intervalViewForStateEvents)),
        switchMap(stateEventsByDay => this.scheduleService.filterSelectedPlanningsFromSchedule(outOfStateSchedule).pipe(
            map(selectedOutOfStatePlannings => {
              const outOfStateEventsByDay = this.planningListToEventsByDay(selectedOutOfStatePlannings, outOfStateInterval);

              return [...stateEventsByDay, ...outOfStateEventsByDay];
            }
            )
          )
        )
      );

    } else {

      return activePlanningList$.pipe(
        map(planningList => {
          const dateInterval = { start: viewStartDate, end: endDateToLoad };

          return this.planningListToEventsByDay(planningList, dateInterval);
        }));

    }
  }
}
