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

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { VersionService } from '@multi/shared';
import { firstValueFrom } from 'rxjs';
import { Capacitor } from '@capacitor/core';
import { AlertController } from '@ionic/angular';
import { TranslateService } from '@ngx-translate/core';
import { storeInitialized$, setDismissedVersion, dismissedVersion$ } from './app-update.repository';

interface AppUpdateInfo  {
  storeVersion: string;
  minVersionRequired: string;
  playStoreUrl: string;
  appStoreUrl: string;
}

@Injectable({
  providedIn: 'root'
})
export class AppUpdateService {
  private appUpdateInfo: AppUpdateInfo | null = null;
  private currentVersion: string | null = null;
  private translations: any;

  constructor(
    private http: HttpClient,
    private alertController: AlertController,
    private translateService: TranslateService,
    private versionService: VersionService
  ) {}

  private async getCurrentVersion(): Promise<string> {
    return await firstValueFrom(this.versionService.getCurrentAppVersion());
  }

  private async fetchUpdateInfoFromBackend(): Promise<AppUpdateInfo> {
    return {
      storeVersion: '2.0.8',
      minVersionRequired: '1.0.0',
      playStoreUrl: 'https://play.google.com/store/apps/details?id=fr.univlorraine.mobile.appUnivLorraine',
      appStoreUrl: 'https://apps.apple.com/fr/app/univlorraine/id834941312',
    };
  }

  private isVersionLowerThanStore(version: string, storeVersion: string): boolean {
    const versionParts = version.split('.').map(Number);
    const storeVersionParts = storeVersion.split('.').map(Number);

    for (let i = 0; i < Math.max(versionParts.length, storeVersionParts.length); i++) {
      const v = versionParts[i] || 0;
      const sV = storeVersionParts[i] || 0;
      if (v < sV) return true;  // La version actuelle est inférieure à la version à comparer
      if (v > sV) return false; // La version actuelle est supérieure
    }
    return false; // Les versions sont les mêmes
  }

  // Préchargement des traductions pour les alertes
  // Hack nécessaire pour que les traductions soient chargées avant l'affichage de l'alerte de mise à jour
  private async loadTranslations() {
    this.translations = await firstValueFrom(
      this.translateService.get([
        'APP-UPDATE.MANDATORY_UPDATE_ALERT.HEADER',
        'APP-UPDATE.MANDATORY_UPDATE_ALERT.MESSAGE',
        'APP-UPDATE.MANDATORY_UPDATE_ALERT.UPDATE_NOW',
        'APP-UPDATE.OPTIONAL_UPDATE_ALERT.HEADER',
        'APP-UPDATE.OPTIONAL_UPDATE_ALERT.MESSAGE',
        'APP-UPDATE.OPTIONAL_UPDATE_ALERT.UPDATE_NOW',
        'APP-UPDATE.OPTIONAL_UPDATE_ALERT.UPDATE_LATER'
      ])
    );
  }

  private async showMandatoryUpdateAlert() {
    const alert = await this.alertController.create({
      header: this.translations['APP-UPDATE.MANDATORY_UPDATE_ALERT.HEADER'],
      message: this.translations['APP-UPDATE.MANDATORY_UPDATE_ALERT.MESSAGE'],
      buttons: [
        {
          text: this.translations['APP-UPDATE.MANDATORY_UPDATE_ALERT.UPDATE_NOW'],
          handler: () => {
            window.location.href = this.getStoreUrl();
          }
        }
      ],
      backdropDismiss: false,
    });

    await alert.present();
  }

  private async showOptionalUpdateAlert() {
    const alert = await this.alertController.create({
      header: this.translations['APP-UPDATE.OPTIONAL_UPDATE_ALERT.HEADER'],
      message: this.translations['APP-UPDATE.OPTIONAL_UPDATE_ALERT.MESSAGE'],
      buttons: [
        {
          text: this.translations['APP-UPDATE.OPTIONAL_UPDATE_ALERT.UPDATE_LATER'],
          role: 'cancel',
          handler: () => {
            this.dismissUpdate();
          }
        },
        {
          text: this.translations['APP-UPDATE.OPTIONAL_UPDATE_ALERT.UPDATE_NOW'],
          handler: () => {
            window.location.href = this.getStoreUrl();
          }
        }
      ],
      backdropDismiss: true,
    });

    await alert.present();
  }

  private dismissUpdate() {
    setDismissedVersion(this.appUpdateInfo?.storeVersion || '');
  }

  private getStoreUrl(): string {
    return Capacitor.getPlatform() === 'android'
      ? this.appUpdateInfo.playStoreUrl
      : this.appUpdateInfo.appStoreUrl
      ;
  }

  async checkForUpdate(): Promise<void> {
    this.currentVersion = await this.getCurrentVersion();
    this.appUpdateInfo = await this.fetchUpdateInfoFromBackend();

    if (this.appUpdateInfo) {
      await this.loadTranslations();
      const isMandatory: boolean = this.isVersionLowerThanStore(this.currentVersion, this.appUpdateInfo.minVersionRequired);

      if (isMandatory) {
        await this.showMandatoryUpdateAlert();
        return;
      }

      await firstValueFrom(storeInitialized$);
      const dismissedVersion = await firstValueFrom(dismissedVersion$);
      if (dismissedVersion !== this.appUpdateInfo.storeVersion) {
        await this.showOptionalUpdateAlert();
        return;
      }
    }
  }
}
