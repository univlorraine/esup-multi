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
import { AlertController } from '@ionic/angular';
import { Actions } from '@ngneat/effects-ng';
import { TranslateService } from '@ngx-translate/core';
import { cleanupPrivateData, getAuthToken, getExpectedErrorMessage, NetworkService } from '@multi/shared';
import { take } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class AppErrorHandler implements ErrorHandler {

  private translateService: TranslateService;

  constructor(
    private actions: Actions,
    private alertController: AlertController,
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
      return this.displayError('NO_NETWORK');
    }

    switch (error.status) {
      case 0:
        return this.displayError('SERVICE_UNREACHABLE');

      // 401 errors are handled by auth.interceptor.ts in the shared module. The following code is not
      // executed if auth.interceptor is enabled.
      case 401: {
        getAuthToken().pipe(take(1)).subscribe(token => this.actions.dispatch(cleanupPrivateData({authToken: token})));
        return this.displayError('UNAUTHENTICATED');
      }
      case 500: {
        // expected errors (business error case which should display a specific message)
        const expectedErrorMessage = getExpectedErrorMessage(error);
        if (expectedErrorMessage) {
          return this.displayWarning(expectedErrorMessage);
        }
        // unexpected errors
        return this.displayGenericError(error);
      }
      default:
        return this.displayGenericError(error);
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

  private async displayWarning(message: string) {
    const header = this.translateService.instant(`ERROR.WARNING.TITLE`);

    const alert = await this.alertController.create({
      header,
      message,
      buttons: ['OK'],
    });

    await alert.present();
  }

  private async displayError(errorType: string) {
    const header = this.translateService.instant(`ERROR.${errorType}.TITLE`);
    const message = this.translateService.instant(`ERROR.${errorType}.MESSAGE`);

    const alert = await this.alertController.create({
      header,
      message,
      buttons: ['OK'],
    });

    await alert.present();
  }

  private async displayGenericError(error: HttpErrorResponse) {
    const header = this.translateService.instant('ERROR.UNKNOWN');

    const alert = await this.alertController.create({
      header,
      subHeader: error.statusText,
      message: error.message,
      buttons: ['OK'],
    });

    await alert.present();
  }
}
