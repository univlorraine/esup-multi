import { Injectable } from '@angular/core';
import { ScreenBrightness } from '@capacitor-community/screen-brightness';
import { Platform } from '@ionic/angular';
import { from } from 'rxjs';
import { filter, finalize, first, switchMap } from 'rxjs/operators';
import { brightness$, setBrightness } from './screen.repository';

@Injectable({
  providedIn: 'root'
})
export class ScreenService {

  private fullBrightnessEnabled = false;

  constructor(private platform: Platform) {}

  public async fullBrightness() {
    // the brightness plugin only works with capacitor
    if (!this.platform.is('capacitor')) {
      return;
    }

    // prevent multiple full brightness activation
    if(this.fullBrightnessEnabled === true) {
      return;
    }

    this.fullBrightnessEnabled = true;
    const { brightness } = await ScreenBrightness.getBrightness();
    setBrightness(brightness);
    await ScreenBrightness.setBrightness({brightness: 1.0});
  }

  public async restorePreviousBrightness() {
    // the brightness plugin only works with capacitor
    if (!this.platform.is('capacitor')) {
      return;
    }

    if(this.fullBrightnessEnabled === false) {
      return;
    }

    return brightness$.pipe(
      first(),
      filter(brightness => brightness !== null),
      switchMap(brightness => from(ScreenBrightness.setBrightness({brightness}))),
      finalize(() => this.fullBrightnessEnabled = false)
    ).toPromise();
  }
}
