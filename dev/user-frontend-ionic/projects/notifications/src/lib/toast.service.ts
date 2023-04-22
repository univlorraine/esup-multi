import { Injectable } from '@angular/core';
import { ToastController } from '@ionic/angular';
import { TranslateService } from '@ngx-translate/core';

@Injectable({
  providedIn: 'root'
})
export class ToastService {

  constructor(
    private toastController: ToastController,
    private translateService: TranslateService
  ) { }

  async displayToast(messageToTranslate: string, channel?: string) {
    const message = this.translateService.instant(messageToTranslate).replace(
      /\{channel\}/g,
      channel,
    );
    const toast = await this.toastController.create({
      message,
      duration: 1500,
      position: 'bottom',
      color: 'success'
    });
    toast.present();
  }
}
