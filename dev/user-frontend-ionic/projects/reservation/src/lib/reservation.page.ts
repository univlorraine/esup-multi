import { Component } from '@angular/core';
import { ReservationService } from './reservation.service';
import { Router} from '@angular/router';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-reservation',
  templateUrl: './reservation.page.html',
  styleUrls: ['./reservation.page.scss'],
})
export class ReservationPage {

  constructor(
    private navController: NavController,
    private router: Router,
    private reservationService: ReservationService,
  ) { }

  openReservationService() {
    this.reservationService.openReservationService();
  }

  navigateToScanPage() {
    this.navController.setDirection('forward', false);
    this.router.navigate(['/reservation/scan']);
  }
}
