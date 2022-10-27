import { Injectable, ErrorHandler } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { AlertController } from '@ionic/angular';

@Injectable({
  providedIn: 'root',
})
export class AppErrorHandler implements ErrorHandler {
  constructor(private alertController: AlertController) {}

  handleError(error: Error | HttpErrorResponse) {

    if (error instanceof HttpErrorResponse) {
        this.alertHttpError(error as HttpErrorResponse);
    }

    console.error(error);
  }

  private async alertHttpError(error: HttpErrorResponse) {
    const alert = await this.alertController.create({
      header: 'Erreur inattendue',
      subHeader: error.statusText,
      message: error.message,
      buttons: ['OK'],
    });

    await alert.present();
  }
}
