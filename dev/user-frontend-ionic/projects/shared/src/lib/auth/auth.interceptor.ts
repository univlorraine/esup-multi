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

import {
  HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor,
  HttpRequest
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Actions } from '@ngneat/effects-ng';
import { Observable, Subject, throwError } from 'rxjs';
import { catchError, concatMap, finalize, take } from 'rxjs/operators';
import { cleanupPrivateData } from '../shared.actions';
import { getAuthToken } from './auth.repository';
import { KeepAuthService } from './keep-auth.service';
import { NavigationService } from '../navigation/navigation.service';


@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  public isRefreshingToken = false;
  private refreshTokenTrigger$ = new Subject<string>();

  constructor(
    private keepAuthService: KeepAuthService,
    private actions: Actions,
    private navigationService: NavigationService,
  ) {}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const isLoginRequest = request.url.includes('/auth');

    return next.handle(request).pipe(
      catchError((err: any) => {
        if (!(err instanceof HttpErrorResponse)) {
          return throwError(err);
        }

        if (isLoginRequest) {
          getAuthToken().pipe(take(1)).subscribe(token => this.actions.dispatch(cleanupPrivateData({ authToken: token })));
          return throwError(err);
        }

        if (err.status !== 401 && err.status !== 423) {
          return throwError(err);
        }

        if (err.status === 401 && request.url.includes('/reauth')) {
          // We tried to reauth but still got 401, we redirect to login page
          this.navigationService.navigateToAuth();
          return throwError(err);
        }

        if (!this.isRefreshingToken) {
          this.isRefreshingToken = true;

          return this.keepAuthService.reauthenticateIfAvailable().pipe(
            concatMap((authenticatedUser) => {

              if (!authenticatedUser) {
                return throwError(err);
              }

              const newBody = {
                ...request.body,
                authToken: authenticatedUser.authToken,
              };

              request = request.clone({
                body: newBody,
              });

              this.refreshTokenTrigger$.next(authenticatedUser.authToken);
              return next.handle(request);

            }),
            catchError((error) => throwError(error)),
            finalize(() => this.isRefreshingToken = false));

        } else {
          return this.refreshTokenTrigger$.pipe(
            concatMap((authToken) => {

              if (!authToken) {
                return throwError(err);
              }

              const newBody = {
                ...request.body,
                authToken,
              };

              const clonedRequest = request.clone({
                body: newBody,
              });

              return next.handle(clonedRequest);
            })
          );
        }
      })
    );
  }
}
