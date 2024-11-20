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

import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthenticatedUser, getAuthToken, MultiTenantService, updateAuthToken, updateRefreshAuthToken, updateUser } from '@multi/shared';
import { EMPTY, Observable, of, throwError, zip } from 'rxjs';
import { catchError, concatMap, delayWhen, take } from 'rxjs/operators';

interface KeepAuthenticatedUser extends AuthenticatedUser {
  refreshAuthToken: string;
  authToken: string;
}

@Injectable({
  providedIn: 'root'
})
export class KeepAuthService {


  constructor(
    private multiTenantService: MultiTenantService,
    private http: HttpClient) { }

  login(username: string, password: string): Observable<AuthenticatedUser | null> {

    const url = `${this.multiTenantService.getApiEndpoint()}/keep-auth/auth`;
    const data = {
      username,
      password,
    };

    return this.http.post<KeepAuthenticatedUser>(url, data, {}).pipe(
      delayWhen(keepAuthenticatedUser => {
        if (!keepAuthenticatedUser) {
          return;
        }

        const {
          refreshAuthToken,
          authToken,
          ...authenticatedUser
        } = keepAuthenticatedUser;
        updateUser(authenticatedUser);
        return zip(
          updateRefreshAuthToken(refreshAuthToken),updateAuthToken(authToken)
        );
      }),
      catchError(err => {
        if (err instanceof HttpErrorResponse) {

          if (err.status === 401) {
            return of(null);
          }

          return throwError(err);
        }
      }));
  }

  logout(refreshAuthToken: string): Observable<boolean> {
    const url = `${this.multiTenantService.getApiEndpoint()}/keep-auth/auth`;
    const headers = {
      // eslint-disable-next-line @typescript-eslint/naming-convention
      Authorization: `Bearer ${refreshAuthToken}`
    };

    return getAuthToken().pipe(
      take(1),
      concatMap((authToken) => {
        if(!authToken) {
          return EMPTY;
        }

        return this.http.delete<boolean>(url, {
          headers,
          body: {
            authToken
          }
        });
      }),
    );
  }

  removeSavedCredentials(refreshAuthToken: string): Observable<boolean> {
    const url = `${this.multiTenantService.getApiEndpoint()}/keep-auth/reauth`;
    const headers = {
      // eslint-disable-next-line @typescript-eslint/naming-convention
      Authorization: `Bearer ${refreshAuthToken}`
    };

    return this.http.delete<boolean>(url, { headers });
  }
}
