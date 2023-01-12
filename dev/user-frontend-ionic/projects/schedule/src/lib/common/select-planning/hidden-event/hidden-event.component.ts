import { Component, Input } from '@angular/core';
import { first } from 'rxjs/operators';
import { HiddenEvent, hiddenEvents$, setHiddenEvents } from '../../../schedule.repository';
import { ScheduleListService } from './../../../schedule-list/schedule-list.service';

@Component({
  selector: 'app-hidden-event',
  templateUrl: './hidden-event.component.html',
  styleUrls: ['./hidden-event.component.scss'],
})
export class HiddenEventComponent {

  @Input() hiddenEvent: HiddenEvent;

  constructor(private scheduleListService: ScheduleListService) { }

  showEvent(eventToShow: HiddenEvent) {

    hiddenEvents$.pipe(first()).subscribe(hiddenEvents => {
      if (hiddenEvents.some(hiddenEvent => hiddenEvent.id === eventToShow.id)) {
        const filteredHiddenEvents = hiddenEvents.filter(hiddenEvent => hiddenEvent.id !== eventToShow.id);
        setHiddenEvents(filteredHiddenEvents);
      }
      this.scheduleListService.emitKeepScrollPosition();
    });

  }
}
