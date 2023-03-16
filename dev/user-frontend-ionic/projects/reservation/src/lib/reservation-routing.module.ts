import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { QRScanPage } from './scan/scan.page';
import { ReservationPage } from './reservation.page';

const routes: Routes = [
  {
    path: 'reservation',
    component: ReservationPage
  },
  {
    path: 'reservation/scan',
    component: QRScanPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ReservationRoutingModule {}
