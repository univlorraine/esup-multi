import { createStore } from '@ngneat/elf';
import { selectAllEntities, setEntities, withEntities } from '@ngneat/elf-entities';
import {
  persistState
} from '@ngneat/elf-persist-state';
import { Authorization } from '../authorization/authorization.helper';
import { localForageStore } from '../store/local-forage';


const STORE_NAME = 'features';

export type FeatureMenuType = 'top' | 'tabs' | 'burger' | 'service';

export enum FeatureType {
  internal = 'internal',
  external = 'external',
}

interface Translation {
  // eslint-disable-next-line @typescript-eslint/naming-convention
  languages_code: string;
  title: string;
  shortTitle?: string;
  content?: string;
  searchKeywords?: string[];
}

interface FeatureCommon {
  id: string;
  type: FeatureType;
  widget: string;
  translations: Translation[];
  authorization?: Authorization;
  menu: FeatureMenuType;
  icon: string;
}

export interface InternalFeature extends FeatureCommon {
  routerLink: string;
  type: FeatureType.internal;
}

export interface ExternalFeature extends FeatureCommon {
  link?: string;
  ssoService?: string;
  type: FeatureType.external;
}

export type Feature = ExternalFeature | InternalFeature;

const store = createStore(
  { name: STORE_NAME },
  withEntities<Feature>()
);

const persist = persistState(store, {
  key: STORE_NAME,
  storage: localForageStore,
});

export const features$ = store.pipe(selectAllEntities());

export const setFeatures = (features: Feature[]) => {
  store.update(setEntities(features));
};

export const clearFeatures = () => store.reset();
