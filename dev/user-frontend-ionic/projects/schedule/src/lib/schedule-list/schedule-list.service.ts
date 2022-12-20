import { Injectable } from '@angular/core';
import { eachDayOfInterval, format, Interval } from 'date-fns';
import { Event, Planning } from '../schedule.repository';

export interface EventsByDay {
  day: string;
  events: Event[];
}

export const formatDay = (date: Date) => format(date, 'yyyy-MM-dd');

@Injectable({
  providedIn: 'root'
})
export class ScheduleListService {

  constructor() {}

  planningListToEventsByDay(planningList: Planning[], dateInterval: Interval): EventsByDay[] {

     if (planningList.length === 0) {
      return [];
    }

    const days = eachDayOfInterval(dateInterval);

    const eventsMapByDay = planningList
      .reduce((events, planning) => events.concat(planning.events),[])
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

}
