import { Inject, Injectable } from '@angular/core';
import { addDays, isAfter, isBefore, startOfDay } from 'date-fns';
import { map } from 'rxjs/operators';
import { ScheduleModuleConfig, SCHEDULE_CONFIG } from '../../schedule.config';
import { displayedEvents$ } from '../../schedule.repository';

@Injectable({
  providedIn: 'root'
})
export class NextEventsService {

  constructor(
    @Inject(SCHEDULE_CONFIG) private config: ScheduleModuleConfig
  ) {}

  public getNextEvents$() {
    return displayedEvents$.pipe(
      map(events => {
        const startDate = new Date();
        const endDate = startOfDay(addDays(startDate, this.config.nextEventsWidget.numberOfDaysLimit + 1));

        return events
          .filter(event => {
            const eventDate = new Date(event.endDateTime);
            return isAfter(eventDate, startDate) &&
              isBefore(eventDate, endDate);
          })
          .sort((evtA, evtB) => new Date(evtA.startDateTime).getTime() - new Date(evtB.startDateTime).getTime())
          .slice(0, this.config.nextEventsWidget.numberOfEventsLimit);
      })
    );
  }

}
