import { InjectionToken } from '@angular/core';

export interface ReservationModuleConfig {
    reservationSsoUrlTemplate: string;
    reservationSsoServiceName: string;
};

export const RESERVATION_CONFIG =
  new InjectionToken<ReservationModuleConfig>('Notifications module config');
