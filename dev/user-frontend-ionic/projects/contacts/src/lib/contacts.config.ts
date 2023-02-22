import { InjectionToken } from '@angular/core';

export interface ContactsModuleConfig {
  contactTypes: string[];
};

export const CONTACTS_CONFIG =
  new InjectionToken<ContactsModuleConfig>('Contacts module config');
