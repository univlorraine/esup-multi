import { InjectionToken } from '@angular/core';

interface GpsCoordinate {
    longitude: number;
    latitude: number;
}
export interface MapModuleConfig {
    defaultMapLocation: GpsCoordinate;
}

export const MAP_CONFIG =
  new InjectionToken<MapModuleConfig>('Map module config');
