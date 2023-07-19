import { Component, Input } from '@angular/core';
import { isSameDay } from 'date-fns';
import { Event } from '../../schedule.repository';

@Component({
  selector: 'app-calendar-event',
  templateUrl: './calendar-event.component.html',
  styleUrls: ['./calendar-event.component.scss'],
})
export class CalendarEventComponent {

  @Input() event: Event;
  @Input() viewType: string;

  constructor() {}

  getCurrentDateClass(): string {
    const currentDate = new Date();
    const eventDate = new Date(this.event.startDateTime);

    return isSameDay(currentDate, eventDate) ? 'current-date' : '';
  }
}
