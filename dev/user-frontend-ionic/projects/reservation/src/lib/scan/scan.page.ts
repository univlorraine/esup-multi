import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { BarcodeScanner } from '@capacitor-community/barcode-scanner';
import { ReservationService } from '../reservation.service';
import { NavigationService } from '@ul/shared';

@Component({
  selector: 'app-scan',
  templateUrl: './scan.page.html',
  styleUrls: ['./scan.page.scss'],
})

export class QRScanPage {
  hideContent = false;

  constructor(
    private navigationService: NavigationService,
    private reservationService: ReservationService,
    private router: Router,
  ) { }

  ionViewWillLeave() {
    document.querySelector('body').classList.remove('scanner-active');
    BarcodeScanner.stopScan();
  }

  async ionViewWillEnter() {
    document.querySelector('body').classList.add('scanner-active');
    const permission = await BarcodeScanner.checkPermission({ force: true });
    if (!permission.granted) {
      BarcodeScanner.openAppSettings();
      return;
    }
    const result = await BarcodeScanner.startScan();
    if (result.hasContent) {
      this.reservationService.openURL(result.content);
      this.navigationService.navigateBack();
    }
  }
}
