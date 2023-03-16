import { Component } from '@angular/core';
import { ReservationService } from './reservation.service';
import { BarcodeScanner } from '@capacitor-community/barcode-scanner';
import { Router } from '@angular/router';

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
