import { Component, Input } from '@angular/core';
import { Event } from '../../schedule.repository';

@Component({
  selector: 'app-calendar-event',
  templateUrl: './calendar-event.component.html',
  styleUrls: ['./calendar-event.component.scss'],
})
export class CalendarEventComponent {

  @Input() event: Event;
  @Input() viewType: string;
  constructor() { }

}
