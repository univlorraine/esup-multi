/*
 * Copyright ou © ou Copr. Université de Lorraine, (2022)
 *
 * Direction du Numérique de l'Université de Lorraine - SIED
 *  (dn-mobile-dev@univ-lorraine.fr)
 * JNESIS (contact@jnesis.com)
 *
 * Ce logiciel est un programme informatique servant à rendre accessible
 * sur mobile divers services universitaires aux étudiants et aux personnels
 * de l'université.
 *
 * Ce logiciel est régi par la licence CeCILL 2.1, soumise au droit français
 * et respectant les principes de diffusion des logiciels libres. Vous pouvez
 * utiliser, modifier et/ou redistribuer ce programme sous les conditions
 * de la licence CeCILL telle que diffusée par le CEA, le CNRS et INRIA
 * sur le site "http://cecill.info".
 *
 * En contrepartie de l'accessibilité au code source et des droits de copie,
 * de modification et de redistribution accordés par cette licence, il n'est
 * offert aux utilisateurs qu'une garantie limitée. Pour les mêmes raisons,
 * seule une responsabilité restreinte pèse sur l'auteur du programme, le
 * titulaire des droits patrimoniaux et les concédants successifs.
 *
 * À cet égard, l'attention de l'utilisateur est attirée sur les risques
 * associés au chargement, à l'utilisation, à la modification et/ou au
 * développement et à la reproduction du logiciel par l'utilisateur étant
 * donné sa spécificité de logiciel libre, qui peut le rendre complexe à
 * manipuler et qui le réserve donc à des développeurs et des professionnels
 * avertis possédant des connaissances informatiques approfondies. Les
 * utilisateurs sont donc invités à charger et à tester l'adéquation du
 * logiciel à leurs besoins dans des conditions permettant d'assurer la
 * sécurité de leurs systèmes et/ou de leurs données et, plus généralement,
 * à l'utiliser et à l'exploiter dans les mêmes conditions de sécurité.
 *
 * Le fait que vous puissiez accéder à cet en-tête signifie que vous avez
 * pris connaissance de la licence CeCILL 2.1, et que vous en avez accepté les
 * termes.
 */

import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { BarcodeScanner } from '@capacitor-community/barcode-scanner';
import { ReservationService } from '../reservation.service';
import { NavigationService } from '@multi/shared';

@Component({
  selector: 'app-scan',
  templateUrl: './scan.page.html',
  styleUrls: ['../../../../../src/theme/app-theme/reservation/scan.page.scss'],
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
