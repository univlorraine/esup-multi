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

import { HttpErrorResponse } from '@angular/common/http';
import { ErrorHandler, Injectable, Injector } from '@angular/core';
import { Actions } from '@ngneat/effects-ng';
import { TranslateService } from '@ngx-translate/core';
import {
  AlertsService,
  cleanupPrivateData,
  getAuthToken,
  getExpectedErrorMessage,
  NetworkService
} from '@multi/shared';
import { take } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class AppErrorHandler implements ErrorHandler {
  private translateService: TranslateService;

  constructor(
    private actions: Actions,
    private alertsService: AlertsService,
    private injector: Injector,
    private networkService: NetworkService,
  ) { }

  async handleError(error: Error | HttpErrorResponse) {
    this.loadTranslateService();
    if (error instanceof HttpErrorResponse) {
      await this.handleHttpError(error as HttpErrorResponse);
    }

    if (error) {
      console.error(error);
    }
  }

  private async handleHttpError(error: HttpErrorResponse) {
    if (!(await this.networkService.getConnectionStatus()).connected) {
      return this.alertsService.enqueueAlert({
        header: this.translateService.instant('ERROR.NO_NETWORK.TITLE'),
        message: this.translateService.instant('ERROR.NO_NETWORK.MESSAGE'),
        type: 'error',
        priority: 10
      });
    }

    switch (error.status) {
      case 0:
        return this.alertsService.enqueueAlert({
          header: this.translateService.instant('ERROR.SERVICE_UNREACHABLE.TITLE'),
          message: this.translateService.instant('ERROR.SERVICE_UNREACHABLE.MESSAGE'),
          type: 'error',
          priority: 10
        });

      case 401: {
        getAuthToken()
          .pipe(take(1))
          .subscribe((token) =>
            this.actions.dispatch(cleanupPrivateData({ authToken: token }))
          );
        return this.alertsService.enqueueAlert({
          header: this.translateService.instant('ERROR.UNAUTHENTICATED.TITLE'),
          message: this.translateService.instant('ERROR.UNAUTHENTICATED.MESSAGE'),
          type: 'error',
          priority: 10
        });
      }

      case 500: {
        const expectedErrorMessage = getExpectedErrorMessage(error);
        if (expectedErrorMessage) {
          return this.alertsService.enqueueAlert({
            header: this.translateService.instant('ERROR.WARNING.TITLE'),
            message: expectedErrorMessage,
            type: 'warning',
            priority: 20
          });
        }
        return this.alertsService.enqueueAlert({
          header: this.translateService.instant('ERROR.UNKNOWN'),
          message: error.message,
          type: 'generic',
          priority: 15
        });
      }

      default:
        return this.alertsService.enqueueAlert({
          header: this.translateService.instant('ERROR.UNKNOWN'),
          message: error.message,
          type: 'generic',
          priority: 15
        });
    }
  }

  /**
   * Ugly hack because injecting TranslateService directly in constructor breaks multi-module internationalization
   * due to ErrorHandler being processed early in app init mechanism.
   */
  private loadTranslateService() {
    if (this.translateService) {
      return;
    }

    this.translateService = this.injector.get(TranslateService);
  }
}
