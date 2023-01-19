import { Component, Input } from '@angular/core';
import { first } from 'rxjs/operators';
import { Course, Event, HiddenCourse } from '../../schedule.repository';
import { ScheduleService } from '../../schedule.service';
import { hiddenCourseList$, setHiddenCourseList } from './../../schedule.repository';

@Component({
  selector: 'app-event-detail',
  templateUrl: './event-detail.component.html',
  styleUrls: ['./event-detail.component.scss'],
})
export class EventDetailComponent {

  @Input() event: Event;
  @Input() displayShortenedDate = false;
  public disableHideCourseButton = false;

  constructor(private scheduleService: ScheduleService) { }

  hideAllSimilarCourse(course: Course) {
    this.disableHideCourseButton = true;

    //@TODO supprimer ligne suivante quand l'API de l'UL sera en place
    // course.id = course._adeEventId.toString();
    course.id = course.code;

    hiddenCourseList$.pipe(first()).subscribe(hiddenCourseList => {
      const hiddenCourseObj: HiddenCourse = {
        id: course.id,
        title: course.label
      };

      if (!hiddenCourseList.some(hiddenCourse => hiddenCourse.id === hiddenCourseObj.id)) {
        setHiddenCourseList([...hiddenCourseList, hiddenCourseObj]);
      }
      this.scheduleService.emitHideCourseEvt();
    });
  }
}
