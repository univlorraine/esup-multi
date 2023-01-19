import { Component, Input } from '@angular/core';
import { first } from 'rxjs/operators';
import { ScheduleListService } from '../../../schedule-list/schedule-list.service';
import { HiddenCourse, hiddenCourseList$, setHiddenCourseList } from '../../../schedule.repository';

@Component({
  selector: 'app-hidden-course',
  templateUrl: './hidden-course.component.html',
  styleUrls: ['./hidden-course.component.scss'],
})
export class HiddenCourseComponent {

  @Input() hiddenCourse: HiddenCourse;

  constructor(private scheduleListService: ScheduleListService) { }

  showAllSimilarCourse(courseToShow: HiddenCourse) {

    hiddenCourseList$.pipe(first()).subscribe(hiddenCourseList => {
      if (hiddenCourseList.some(hiddenCourse => hiddenCourse.id === courseToShow.id)) {
        const filteredHiddenCourseList = hiddenCourseList.filter(hiddenCourse => hiddenCourse.id !== courseToShow.id);
        setHiddenCourseList(filteredHiddenCourseList);
      }
      this.scheduleListService.emitShowCourseEvt();
    });

  }
}
