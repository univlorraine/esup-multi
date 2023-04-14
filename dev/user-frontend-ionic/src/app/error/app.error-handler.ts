import { Injectable, ErrorHandler, Injector } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { AlertController } from '@ionic/angular';
import { TranslateService } from '@ngx-translate/core';
import { cleanupPrivateData, getAuthToken, getExpectedErrorMessage } from '@ul/shared';
import { Actions } from '@ngneat/effects-ng';
import { Network } from '@capacitor/network';
import { first } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class AppErrorHandler implements ErrorHandler {

  private translateService: TranslateService;

  constructor(
    private actions: Actions,
    private alertController: AlertController,
    private injector: Injector,
  ) {}

  async handleError(error: Error | HttpErrorResponse) {
    this.loadTranslateService();
    if (error instanceof HttpErrorResponse) {
        await this.handleHttpError(error as HttpErrorResponse);
    }

    console.error(error);
  }

  private async handleHttpError(error: HttpErrorResponse) {
    if (!(await Network.getStatus()).connected) {
      return this.displayError('NO_NETWORK');
    }

    switch(error.status) {
      case 0:
        return this.displayError('SERVICE_UNREACHABLE');
      case 401:
        getAuthToken().pipe(first()).subscribe(token => this.actions.dispatch(cleanupPrivateData({authToken: token})));
        return this.displayError('UNAUTHENTICATED');
      case 500:
        // expected errors (business error case which should display a specific message)
        const expectedErrorMessage = getExpectedErrorMessage(error);
        if(expectedErrorMessage) {
          return this.displayWarning(expectedErrorMessage);
        }
        // unexpected errors
        return this.displayGenericError(error);
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
