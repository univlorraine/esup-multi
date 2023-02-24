import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ReservationPage } from './reservation.page';

const routes: Routes = [
  {
    path: 'reservation',
    component: ReservationPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ReservationRoutingModule {}
