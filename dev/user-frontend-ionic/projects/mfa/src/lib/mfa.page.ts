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
import { BehaviorSubject, combineLatest, defaultIfEmpty, Observable, of } from 'rxjs';
import { map, shareReplay, switchMap } from 'rxjs/operators';
import { CustomIconComponent, HeaderComponent } from '@multi/shared';
import { MfaFactorComponent, MfaFactorMenuAction } from './mfa-factor/mfa-factor.component';
import { MFA_CONFIG, MfaFactor, MfaModuleConfig } from './mfa.config';
import { TotpCodeComponent } from './totp/totp-code/totp-code.component';
import { TotpEnrollmentLinkService } from './totp/totp-enrollment-link.service';
import { TotpAccount, TotpRepository } from './totp/totp.repository';

// import { MfaService } from './mfa.service';

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
  private actionSheetController = inject(ActionSheetController);
  private navController = inject(NavController);
  private translateService = inject(TranslateService);
  private readonly totpRepository = inject(TotpRepository);
  private readonly totpEnrollmentLinkService = inject(TotpEnrollmentLinkService);

  // private mfaService = inject(MfaService);

  private readonly totpAccountRefreshSubject = new BehaviorSubject<void>(undefined);

  /** Enrôlement TOTP reçu par lien, en attente de confirmation par l'utilisateur. */
  protected readonly pendingTotpEnrollment$ = this.totpEnrollmentLinkService.pendingEnrollment$;

  protected readonly totpAccount$: Observable<TotpAccount | null> =
    this.totpAccountRefreshSubject.pipe(
      switchMap(() => this.totpRepository.getTotpAccount()),
      shareReplay({ bufferSize: 1, refCount: true }),
    );

  private readonly factorEnabled: Record<MfaFactor['id'], () => Observable<boolean>> = {
    totp: () => this.totpAccount$.pipe(map((account) => !!account)),
    push: () => of(false), // TODO
  };

  /** Facteurs présents dans la configuration et activés par l'utilisateur. */
  protected readonly activeFactors$: Observable<MfaFactor[]> = combineLatest(
    this.config.availableFactors.map((factor) =>
      this.factorEnabled[factor.id]().pipe(map((enabled) => ({ factor, enabled }))),
    ),
  ).pipe(
    map((factors) => factors.filter(({ enabled }) => enabled).map(({ factor }) => factor)),
    defaultIfEmpty([]),
  );

  /** Affiche le rappel OTP-Manager uniquement juste après un enrôlement. */
  protected totpJustEnrolled = false;

  /** Facteur dont le pavé « Plus d'info » est ouvert. */
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

    switch (factor.id) {
      case 'totp':
        this.totpRepository.deleteTotpAccount().subscribe({
          next: () => {
            this.totpEnrollmentLinkService.forgetLastEnrollment();
            this.totpJustEnrolled = false;
            this.totpAccountRefreshSubject.next();
          },
          error: () => console.error('MFA: impossible de supprimer le compte TOTP'),
        });
        break;
    }
  }

  protected confirmTotpEnrollment(account: TotpAccount | null): void {
    if (!account) {
      return;
    }

    this.totpEnrollmentLinkService.enroll(account).subscribe({
      next: () => {
        this.totpJustEnrolled = true;
        this.totpAccountRefreshSubject.next();
      },
      error: (e) => console.error("MFA: impossible d'enregistrer le compte TOTP", e),
    });
  }

  protected cancelTotpEnrollment(): void {
    this.totpEnrollmentLinkService.discard();
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
