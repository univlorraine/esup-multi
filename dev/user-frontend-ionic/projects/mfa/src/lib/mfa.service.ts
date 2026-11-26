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

import { inject, Injectable } from '@angular/core';
import { BehaviorSubject, combineLatest, defaultIfEmpty, Observable, of } from 'rxjs';
import { map, shareReplay, switchMap, tap } from 'rxjs/operators';
import { MFA_CONFIG, MfaFactor, MfaModuleConfig } from './mfa.config';
import { TotpEnrollmentLinkService } from './totp/totp-enrollment-link.service';
import { TotpAccount, TotpRepository } from './totp/totp.repository';

@Injectable({
  providedIn: 'root',
})
export class MfaService {
  private readonly config = inject<MfaModuleConfig>(MFA_CONFIG);
  private readonly totpRepository = inject(TotpRepository);
  private readonly totpEnrollmentLinkService = inject(TotpEnrollmentLinkService);

  private readonly totpAccountRefreshSubject = new BehaviorSubject<void>(undefined);

  /** Enrôlement TOTP reçu par lien, en attente de confirmation par l'utilisateur. */
  public readonly pendingTotpEnrollment$ = this.totpEnrollmentLinkService.pendingEnrollment$;

  public readonly totpAccount$: Observable<TotpAccount | null> =
    this.totpAccountRefreshSubject.pipe(
      switchMap(() => this.totpRepository.getTotpAccount()),
      shareReplay({ bufferSize: 1, refCount: true }),
    );

  private readonly factorEnabled: Record<MfaFactor['id'], () => Observable<boolean>> = {
    totp: () => this.totpAccount$.pipe(map((account) => !!account)),
    push: () => of(false), // TODO
  };

  /** Facteurs présents dans la configuration et activés par l'utilisateur. */
  public readonly activeFactors$: Observable<MfaFactor[]> = combineLatest(
    this.config.availableFactors.map((factor) =>
      this.factorEnabled[factor.id]().pipe(map((enabled) => ({ factor, enabled }))),
    ),
  ).pipe(
    map((factors) => factors.filter(({ enabled }) => enabled).map(({ factor }) => factor)),
    defaultIfEmpty([]),
  );

  /**
   * Enregistre un compte TOTP et rafraîchit l'état des facteurs.
   * L'abonnement reste à la charge de l'appelant (feedback visuel, erreurs).
   */
  public enrollTotp(account: TotpAccount): Observable<void> {
    return this.totpEnrollmentLinkService
      .enroll(account)
      .pipe(tap(() => this.refreshTotpAccount()));
  }

  /** Supprime le facteur demandé et rafraîchit l'état des facteurs. */
  public deleteFactor(factor: MfaFactor): Observable<void> {
    switch (factor.id) {
      case 'totp':
        return this.totpRepository.deleteTotpAccount().pipe(
          tap(() => {
            this.totpEnrollmentLinkService.forgetLastEnrollment();
            this.refreshTotpAccount();
          }),
        );
      default:
        return of(void 0);
    }
  }

  /** Abandonne l'enrôlement TOTP en attente. */
  public cancelTotpEnrollment(): void {
    this.totpEnrollmentLinkService.discard();
  }

  /** Force la relecture du compte TOTP (utile après un enrôlement manuel). */
  public refreshTotpAccount(): void {
    this.totpAccountRefreshSubject.next();
  }
}
