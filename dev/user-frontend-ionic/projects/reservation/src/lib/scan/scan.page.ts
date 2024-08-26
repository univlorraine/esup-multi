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
import { BarcodeScanner, BarcodeValueType } from '@capacitor-mlkit/barcode-scanning';
import { ReservationService } from '../reservation.service';
import { NavigationService } from '@multi/shared';
import { PluginListenerHandle } from '@capacitor/core';

@Component({
  selector: 'app-scan',
  templateUrl: './scan.page.html',
  styleUrls: ['../../../../../src/theme/app-theme/styles/reservation/scan.page.scss'],
})

export class QRScanPage {
  private listener: PluginListenerHandle;
  private url: string = null;

  constructor(
    private navigationService: NavigationService,
    private reservationService: ReservationService,
  ) { }

  ionViewWillLeave() {
    this.listener.remove();
    document.querySelector('body').classList.remove('scanner-active');
    BarcodeScanner.stopScan();
    if (this.url) {
      // ouvrir l'URL depuis le listener ne fonctionne pas à chaque fois, donc on l'ouvre quand on quitte la page
      this.reservationService.openURL(this.url);
    }
  }

  async ionViewWillEnter() {
    document.querySelector('body').classList.add('scanner-active');

    const granted = await this.requestPermissions();
    if (!granted) {
      BarcodeScanner.openSettings();
      this.navigationService.navigateBack();
      return;
    }

    this.listener = await BarcodeScanner.addListener(
      'barcodeScanned',
      async result => {
        if (result.barcode.valueType === BarcodeValueType.Url) {
          this.url = result.barcode.displayValue;
          this.navigationService.navigateBack();
        }
      },
    );

    await BarcodeScanner.startScan();
  }

  private async requestPermissions(): Promise<boolean> {
    const { camera } = await BarcodeScanner.requestPermissions();
    return camera === 'granted' || camera === 'limited';
  }
}
