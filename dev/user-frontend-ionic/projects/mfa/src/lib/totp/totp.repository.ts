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
import { KeychainAccess, SecureStorage } from '@aparajita/capacitor-secure-storage';
import { Capacitor } from '@capacitor/core';
import { from, Observable, of, throwError } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';
import { MultiTenantService } from '@multi/shared';

export interface TotpAccount {
  secret: string;
  name: string;
  issuer: string;
  algorithm: string;
  digits: number;
  period: number;
}

// ! Cette clé ne doit pas être supprimée à la déconnexion.
const TOTP_ACCOUNTS_KEY = 'mfa-totp-accounts';

// Un compte TOTP par tenant, indexé par l'id du tenant : { "<tenantId>": { secret, name, issuer, ... } }
// En mode mono-tenant, index = 'default'.
const DEFAULT_TENANT_ID = 'default';

type TotpAccounts = Record<string, TotpAccount>;

@Injectable({ providedIn: 'root' })
export class TotpRepository {
  private multiTenantService = inject(MultiTenantService);

  private getCurrentTenantKey = (): string =>
    this.multiTenantService.getSelectedTenantId() ?? DEFAULT_TENANT_ID;

  public getTotpAccount = (): Observable<TotpAccount | null> =>
    this.getTotpAccounts().pipe(map((accounts) => accounts[this.getCurrentTenantKey()] ?? null));

  public saveTotpAccount = (account: TotpAccount): Observable<void> =>
    this.getTotpAccounts().pipe(
      switchMap((accounts) =>
        this.setTotpAccounts({ ...accounts, [this.getCurrentTenantKey()]: account }),
      ),
    );

  public deleteTotpAccount = (): Observable<void> =>
    this.getTotpAccounts().pipe(
      switchMap((accounts) => {
        delete accounts[this.getCurrentTenantKey()];
        return this.setTotpAccounts(accounts);
      }),
    );

  private getTotpAccounts = (): Observable<TotpAccounts> => {
    // Seulement sur mobile
    if (!Capacitor.isNativePlatform()) {
      return of({});
    }

    return from(SecureStorage.get(TOTP_ACCOUNTS_KEY)).pipe(
      map((accounts) => (accounts ?? {}) as TotpAccounts),
    );
  };

  private setTotpAccounts = (accounts: TotpAccounts): Observable<void> => {
    // Seulement sur mobile
    if (!Capacitor.isNativePlatform()) {
      return throwError(
        () => new Error("Stockage des comptes TOTP impossible hors de l'application mobile"),
      );
    }

    return from(
      SecureStorage.set(
        TOTP_ACCOUNTS_KEY,
        accounts,
        true,
        false, // évite la synchro avec le trousseau Apple
        KeychainAccess.whenUnlockedThisDeviceOnly, // évite la synchro dans le cloud iOS (pour restauration)
      ),
    );
  };
}
