import { Component, Input } from '@angular/core';
import { Event } from '../../schedule.repository';

@Component({
  selector: 'app-event-detail',
  templateUrl: './event-detail.component.html',
  styleUrls: ['./event-detail.component.scss'],
})
export class EventDetailComponent {

  @Input() event: Event;
  constructor() { }

}
