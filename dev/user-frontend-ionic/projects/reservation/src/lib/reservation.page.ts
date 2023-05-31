import { Component } from '@angular/core';
import { ReservationService } from './reservation.service';

@Component({
  selector: 'app-reservation',
  templateUrl: './reservation.page.html',
  styleUrls: ['./reservation.page.scss'],
})
export class ReservationPage {

  constructor(
    private reservationService: ReservationService,
  ) { }

  openReservationService() {
    this.reservationService.openReservationService();
  }
}
