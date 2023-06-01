import { Component, Input } from '@angular/core';
import { first } from 'rxjs/operators';
import { Course, Event, HiddenCourse } from '../../schedule.repository';
import { ScheduleService } from '../../schedule.service';
import { hiddenCourseList$, setHiddenCourseList } from './../../schedule.repository';
import { Browser } from '@capacitor/browser';

@Component({
  selector: 'app-event-detail',
  templateUrl: './event-detail.component.html',
  styleUrls: ['./event-detail.component.scss'],
})
export class EventDetailComponent {
  @Input() event: Event;
  @Input() displayShortenedDate = false;
  @Input() showHideButton = true;
  public disableHideCourseButton = false;
  public isGroupsVisible = false;

  constructor(private scheduleService: ScheduleService) { }

  hideAllSimilarCourse(course: Course) {
    this.disableHideCourseButton = true;

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

  openCourseURL(url: string) {
    Browser.open({url});
  }

  public toggleExpandGroups() {
    this.isGroupsVisible = !this.isGroupsVisible;
  }
}
