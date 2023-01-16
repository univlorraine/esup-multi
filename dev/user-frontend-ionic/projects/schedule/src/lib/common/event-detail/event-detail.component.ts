import { Component, Input } from '@angular/core';
import { first } from 'rxjs/operators';
import { Event, HiddenEvent } from '../../schedule.repository';
import { ScheduleService } from '../../schedule.service';
import { hiddenEvents$, setHiddenEvents } from './../../schedule.repository';

@Component({
  selector: 'app-event-detail',
  templateUrl: './event-detail.component.html',
  styleUrls: ['./event-detail.component.scss'],
})
export class EventDetailComponent {

  @Input() event: Event;
  @Input() displayShortenedDate = false;
  public disableHideEventButton = false;

  constructor(private scheduleService: ScheduleService) { }

  hideEvent(eventToHide: Event) {
    this.disableHideEventButton = true;

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
      this.scheduleService.emitHideEventEvt();
    });
  }
}
