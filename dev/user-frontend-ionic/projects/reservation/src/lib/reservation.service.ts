import { Inject, Injectable } from '@angular/core';
import { Browser } from '@capacitor/browser';
import { SsoService } from '@ul/shared';
import { ReservationModuleConfig, RESERVATION_CONFIG } from './reservation.config';

@Injectable({
  providedIn: 'root'
})
export class ReservationService {

  constructor(
    @Inject(RESERVATION_CONFIG) private config: ReservationModuleConfig,
    private ssoService: SsoService,
  ) {}

  public openReservationService() {
    this.ssoService.getSsoExternalLink({
      service: this.config.reservationSsoServiceName,
      urlTemplate: this.config.reservationSsoUrlTemplate
    })
    .subscribe(url => Browser.open({ url }));
  }

  public openURL(service: string) {
    this.ssoService.getSsoExternalLink({
      service,
      urlTemplate: `${service}&ticket={st}`
    })
    .subscribe(url => Browser.open({ url }));
  }
}
