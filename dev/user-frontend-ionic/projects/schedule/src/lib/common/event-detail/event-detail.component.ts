import { Component, Input } from '@angular/core';
import { Browser } from '@capacitor/browser';
import { take } from 'rxjs/operators';
import { Course, Event, HiddenCourse } from '../../schedule.repository';
import { ScheduleService } from '../../schedule.service';

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
  public courseUrlRegex = /^https?:\/\//;

  constructor(private scheduleService: ScheduleService) { }

  hideAllSimilarCourse(course: Course) {
    this.disableHideCourseButton = true;

    this.scheduleService.getStoreManager().hiddenCourseList$.pipe(
      take(1)
    ).subscribe((hiddenCourseList) => {
      const hiddenCourseObj: HiddenCourse = {
        id: course.id,
        title: course.label
      };

      if (!hiddenCourseList.some(hiddenCourse => hiddenCourse.id === hiddenCourseObj.id)) {
        this.scheduleService.getStoreManager().setHiddenCourseList([...hiddenCourseList, hiddenCourseObj]);
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

  public isCourseUrlValid() {
    return this.courseUrlRegex.test(this.event.course.url.trim());
  }
}
