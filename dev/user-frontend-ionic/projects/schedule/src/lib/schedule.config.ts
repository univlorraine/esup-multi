import { InjectionToken } from '@angular/core';

interface NextEventsWidgetConfig {
    numberOfEventsLimit: number;
    numberOfDaysLimit: number;
}

export interface ScheduleModuleConfig {
    nextEventsWidget: NextEventsWidgetConfig;
    previousWeeksInCache: number;
    nextWeeksInCache: number;
};

export const SCHEDULE_CONFIG =
  new InjectionToken<ScheduleModuleConfig>('Schedule module config');
