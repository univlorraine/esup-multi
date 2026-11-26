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

import { AsyncPipe } from '@angular/common';
import { Component, inject } from '@angular/core';
import {
  ActionSheetController,
  IonButton,
  IonContent,
  IonIcon,
  IonLabel,
  IonModal,
  NavController,
} from '@ionic/angular';
import { TranslatePipe, TranslateService } from '@ngx-translate/core';
import { CustomIconComponent, HeaderComponent } from '@multi/shared';
import { MfaFactorComponent, MfaFactorMenuAction } from './mfa-factor/mfa-factor.component';
import { MFA_CONFIG, MfaFactor, MfaModuleConfig } from './mfa.config';
import { MfaService } from './mfa.service';
import { TotpCodeComponent } from './totp/totp-code/totp-code.component';
import { TotpAccount } from './totp/totp.repository';

@Component({
  selector: 'app-mfa',
  templateUrl: './mfa.page.html',
  styleUrls: ['../../../../src/theme/app-theme/styles/mfa/mfa.page.scss'],
  standalone: true,
  imports: [
    HeaderComponent,
    IonContent,
    TranslatePipe,
    IonButton,
    CustomIconComponent,
    IonIcon,
    IonLabel,
    MfaFactorComponent,
    TotpCodeComponent,
    IonModal,
    AsyncPipe,
  ],
})
export class MfaPage {
  protected readonly config = inject<MfaModuleConfig>(MFA_CONFIG);
  private readonly mfaService = inject(MfaService);
  private actionSheetController = inject(ActionSheetController);
  private navController = inject(NavController);
  private translateService = inject(TranslateService);

  /** Enrôlement TOTP reçu par lien, en attente de confirmation par l'utilisateur. */
  protected readonly pendingTotpEnrollment$ = this.mfaService.pendingTotpEnrollment$;

  protected readonly totpAccount$ = this.mfaService.totpAccount$;

  /** Facteurs présents dans la configuration et activés par l'utilisateur. */
  protected readonly activeFactors$ = this.mfaService.activeFactors$;

  /** Affiche le rappel OTP-Manager uniquement juste après un enrôlement. */
  protected totpJustEnrolled = false;

  /** Facteur dont le « Plus d'info » est ouvert. */
  protected infoFactor: MfaFactor | null = null;

  /** Facteur en attente de confirmation de suppression. */
  protected factorToDelete: MfaFactor | null = null;

  protected onFactorAction(factor: MfaFactor, action: MfaFactorMenuAction): void {
    if (action === 'info') {
      this.infoFactor = factor;
      return;
    }

    this.factorToDelete = factor;
  }

  protected closeFactorInfo(): void {
    this.infoFactor = null;
  }

  protected cancelFactorDeletion(): void {
    this.factorToDelete = null;
  }

  protected deleteFactor(factor: MfaFactor): void {
    this.factorToDelete = null;

    this.mfaService.deleteFactor(factor).subscribe({
      next: () => {
        this.totpJustEnrolled = false;
      },
      error: () => console.error('MFA: impossible de supprimer le facteur', factor.id),
    });
  }

  protected confirmTotpEnrollment(account: TotpAccount | null): void {
    if (!account) {
      return;
    }

    this.mfaService.enrollTotp(account).subscribe({
      next: () => {
        this.totpJustEnrolled = true;
      },
      error: (e) => console.error("MFA: impossible d'enregistrer le compte TOTP", e),
    });
  }

  protected cancelTotpEnrollment(): void {
    this.mfaService.cancelTotpEnrollment();
  }

  // Menu en bas d'écran : scanner un QR code, saisir la clé manuellement ou annuler
  async openAddMenu() {
    const actionSheet = await this.actionSheetController.create({
      header: this.translateService.instant('MFA.ADD_MENU.HEADER'),
      buttons: [
        {
          text: this.translateService.instant('MFA.ADD_MENU.SCAN'),
          data: 'scan',
        },
        {
          text: this.translateService.instant('MFA.ADD_MENU.MANUAL'),
          data: 'manual',
        },
        {
          text: this.translateService.instant('MFA.ADD_MENU.CANCEL'),
          role: 'cancel',
        },
      ],
    });
    await actionSheet.present();

    const { data } = await actionSheet.onDidDismiss();
    if (data === 'scan') {
      await this.scanQRCode();
    }
    if (data === 'manual') {
      await this.navController.navigateForward('/mfa/manual');
    }
  }

  private async scanQRCode() {
    // const scannedUrl = await this.mfaService.scanQrCode();
    // todo
  }
}
