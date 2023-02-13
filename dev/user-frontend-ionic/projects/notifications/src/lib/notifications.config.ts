import { InjectionToken } from '@angular/core';

export interface NotificationsModuleConfig {
    numberOfNotificationsOnFirstLoad: number;
    numberOfNotificationsToLoadOnScroll: number;
};

export const NOTIFICATIONS_CONFIG =
  new InjectionToken<NotificationsModuleConfig>('Notifications module config');
