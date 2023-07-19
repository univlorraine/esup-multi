import { Component, Input } from '@angular/core';
import { take } from 'rxjs/operators';
import { ScheduleListService } from '../../../schedule-list/schedule-list.service';
import { HiddenCourse } from '../../../schedule.repository';
import { ScheduleService } from '../../../schedule.service';

@Component({
  selector: 'app-hidden-course',
  templateUrl: './hidden-course.component.html',
  styleUrls: ['./hidden-course.component.scss'],
})
export class HiddenCourseComponent {

  @Input() hiddenCourse: HiddenCourse;

  constructor(private scheduleListService: ScheduleListService, private scheduleService: ScheduleService) { }

  showAllSimilarCourse(courseToShow: HiddenCourse) {
    this.scheduleService.getStoreManager().hiddenCourseList$.pipe(take(1)).subscribe(hiddenCourseList => {
      const filteredHiddenCourseList = hiddenCourseList.filter(hiddenCourse => hiddenCourse.id !== courseToShow.id);
      this.scheduleService.getStoreManager().setHiddenCourseList(filteredHiddenCourseList);

      this.scheduleListService.emitShowCourseEvt();
    });
  }
}
