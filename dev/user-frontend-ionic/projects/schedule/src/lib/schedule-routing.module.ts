import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ScheduleListPage } from './schedule-list/schedule-list.page';

const routes: Routes = [
  {
    path: '',
    component: ScheduleListPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SchedulePageRoutingModule { }
