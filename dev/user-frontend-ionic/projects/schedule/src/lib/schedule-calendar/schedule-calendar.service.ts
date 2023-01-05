import { Injectable } from '@angular/core';
import { EventInput } from 'fullcalendar';
import { Planning } from '../schedule.repository';


@Injectable({
  providedIn: 'root'
})
export class ScheduleCalendarService {

  constructor() { }

  planningListToCalendarEvents(planningList: Planning[]): EventInput[] {

    if (planningList.length === 0) {
      return [];
    }

    const eventInput = planningList
      .reduce((events, planning) => events.concat(planning.events), [])
      .map(event =>
       ({
              start: event.startDateTime,
              end: event.endDateTime,
              backgroundColor: event.course.color,
              extendedProps: {
                event
              }
            }));

      return eventInput;
  }
}
