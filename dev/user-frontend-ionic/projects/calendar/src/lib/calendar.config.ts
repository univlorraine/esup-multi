import { InjectionToken } from '@angular/core';

export interface CalendarModuleConfig {
  numberOfEventsLimit: number;
}

export const CALENDAR_CONFIG =
  new InjectionToken<CalendarModuleConfig>('Calendar module config');
