import { InjectionToken } from '@angular/core';

export interface CardsModuleConfig {
    knownErrors: string[];
};

export const CARDS_CONFIG =
  new InjectionToken<CardsModuleConfig>('Cards module config');
