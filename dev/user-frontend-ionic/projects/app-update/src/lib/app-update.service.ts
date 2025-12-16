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
import { AlertsService, GuidedTourService, MultiTenantService, VersionService } from '@multi/shared';
import { firstValueFrom } from 'rxjs';
import { Capacitor } from '@capacitor/core';
import { TranslateService } from '@ngx-translate/core';
import { storeInitialized$, setDismissedVersion, dismissedVersion$ } from './app-update.repository';
import { App } from '@capacitor/app';
import { Platform } from '@ionic/angular';

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
  private initialized = false;

  constructor(
    private http: HttpClient,
    private versionService: VersionService,
    private alertsService: AlertsService,
    private platform: Platform,
    private multiTenantService: MultiTenantService,
    private translateService: TranslateService,
    private guidedTourService: GuidedTourService,
  ) {}

  private async getCurrentVersion(): Promise<string> {
    return await firstValueFrom(this.versionService.getCurrentAppVersion());
  }

  private async fetchUpdateInfoFromBackend(): Promise<AppUpdateInfo> {
    const url = `${this.multiTenantService.getApiEndpoint()}/app-update-infos`;
    return await firstValueFrom(this.http.get<AppUpdateInfo>(url));
  }

  private isVersionLowerThanStore(version: string, storeVersion: string): boolean {
    const parseVersion = (v: string) => v.split('.').map(v => parseInt(v, 10));
    const currentParts = parseVersion(version);
    const storeParts = parseVersion(storeVersion);

    for (let i = 0; i < Math.max(currentParts.length, storeParts.length); i++) {
      const currentPart = currentParts[i] || 0;
      const storePart = storeParts[i] || 0;

      if (currentPart < storePart) return true;
      if (currentPart > storePart) return false;
    }

    return false;
  }

  private async showMandatoryUpdateAlert() {
    this.guidedTourService.setUpdateAlertStatus(true);
    await this.alertsService.enqueueAlert({
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
      type: 'update',
      priority: 1 // On s'assure d'afficher le message de maj avant les autres alertes d'erreur
    });
  }

  private async showOptionalUpdateAlert() {
    this.guidedTourService.setUpdateAlertStatus(true);
    await this.alertsService.enqueueAlert({
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
      backdropDismiss: false,
      type: 'update',
      priority: 1 // On s'assure d'afficher le message de maj avant les autres alertes d'erreur
    });
  }

  private dismissUpdate() {
    setDismissedVersion(this.appUpdateInfo?.storeVersion || '');
    this.guidedTourService.setUpdateAlertStatus(false);
    this.guidedTourService.startGlobalTour();
  }

  private getStoreUrl(): string {
    return Capacitor.getPlatform() === 'android'
      ? this.appUpdateInfo.playStoreUrl
      : this.appUpdateInfo.appStoreUrl
      ;
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

  async initialize(): Promise<void> {
    if (this.initialized || !Capacitor.isNativePlatform()) {
      return;
    }

    await this.platform.ready();
    // On attend que le tenant soit complétement initialisé avant de checker les mises à jour
    await this.multiTenantService.waitUntilReady();
    await this.checkForUpdate();

    App.addListener('resume', () => {
      this.checkForUpdate();
    });

    this.initialized = true;
  }

  async checkForUpdate(): Promise<void> {
    this.currentVersion = await this.getCurrentVersion();
    this.appUpdateInfo = await this.fetchUpdateInfoFromBackend();

    if (!this.appUpdateInfo) return;

    await this.loadTranslations();
    const isMandatory: boolean = this.isVersionLowerThanStore(this.currentVersion, this.appUpdateInfo.minVersionRequired);

    if (isMandatory) {
      await this.showMandatoryUpdateAlert();
      return;
    }

    const isUpdateAvailable = this.isVersionLowerThanStore(this.currentVersion, this.appUpdateInfo.storeVersion);

    if (isUpdateAvailable) {
      await firstValueFrom(storeInitialized$);
      const dismissedVersion = await firstValueFrom(dismissedVersion$);
      if (!dismissedVersion || this.isVersionLowerThanStore(dismissedVersion, this.appUpdateInfo.storeVersion)) {
        await this.showOptionalUpdateAlert();
      }
    }
  }
}
