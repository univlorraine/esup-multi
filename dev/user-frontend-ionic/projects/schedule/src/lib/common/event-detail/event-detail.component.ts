import { Component, Input } from '@angular/core';
import { first } from 'rxjs/operators';
import { ScheduleListService } from '../../schedule-list/schedule-list.service';
import { Event, HiddenEvent } from '../../schedule.repository';
import { hiddenEvents$, setHiddenEvents } from './../../schedule.repository';

@Component({
  selector: 'app-event-detail',
  templateUrl: './event-detail.component.html',
  styleUrls: ['./event-detail.component.scss'],
})
export class EventDetailComponent {

  @Input() event: Event;
  @Input() displayShortenedDate = false;

  constructor(private scheduleListService: ScheduleListService) { }

  hideEvent(eventToHide: Event) {
    //@TODO supprimer ligne suivante quand l'API de l'UL sera en place
    eventToHide.id = eventToHide._adeEventId.toString();

    hiddenEvents$.pipe(first()).subscribe(hiddenEvents => {
      const hiddenEventObj: HiddenEvent = {
        id: eventToHide.id,
        title: eventToHide.course.label
      };

      if (!hiddenEvents.some(hiddenEvent => hiddenEvent.id === hiddenEventObj.id)) {
        setHiddenEvents([...hiddenEvents, hiddenEventObj]);
      }
      this.scheduleListService.emitKeepScrollPosition();
    });
  }
}
