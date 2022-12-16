import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ScheduleListPage } from './schedule-list/schedule-list.page';
import { ScheduleCalendarComponent } from './schedule-calendar/schedule-calendar.component';
import { SchedulePage } from './schedule.page';

const routes: Routes = [
  {
    path: '',
    component: SchedulePage,
    children: [
      {
        path: 'calendar',
        component: ScheduleCalendarComponent,
      },
      {
        path: 'list',
        component: ScheduleListPage
      },
      {
        path: '',
        redirectTo: 'list',
        pathMatch: 'full'
      }
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SchedulePageRoutingModule { }
