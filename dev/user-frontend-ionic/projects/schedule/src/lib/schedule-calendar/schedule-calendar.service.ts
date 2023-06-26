import { Injectable } from '@angular/core';
import { EventInput } from 'fullcalendar';
import { Event } from '../schedule.repository';

@Injectable({
  providedIn: 'root'
})
export class ScheduleCalendarService {

  constructor() { }

  eventsToCalendarEvents(events: Event[]): EventInput[] {

    if (events.length === 0) {
      return [];
    }

    return events
        .map(event =>
          ({
            start: event.startDateTime,
            end: event.endDateTime,
            extendedProps: {
              event
            }
          }));
  }
}
