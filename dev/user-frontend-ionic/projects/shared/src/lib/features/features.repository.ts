import { createStore, select, withProps } from '@ngneat/elf';
import { getAllEntities, getEntity, selectAllEntities, setEntities, updateEntities, withEntities } from '@ngneat/elf-entities';
import {
  persistState
} from '@ngneat/elf-persist-state';
import { Authorization } from '../authorization/authorization.helper';
import { ServiceMenuItem } from '../navigation/menu.model';
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

export interface FeaturesProps {
  userOrder: string[];
}

interface FeatureCommon {
  id: string;
  type: FeatureType;
  widget: string;
  translations: Translation[];
  authorization?: Authorization;
  menu: FeatureMenuType;
  icon: string;
  iconSourceSvg: string;
  isNew: boolean;
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
  withEntities<Feature>(),
  withProps<FeaturesProps>({
    userOrder: [],
  }),
);

const persist = persistState(store, {
  key: STORE_NAME,
  storage: localForageStore,
});

export const features$ = store.pipe(selectAllEntities());
export const featuresUserOrder$ = store.pipe(select((state) => state.userOrder));

export const setFeatures = (features: Feature[]) => {
  const previousFeatures = store.query(getAllEntities());

  if (previousFeatures && previousFeatures.length > 0) {
    const updatedFeatures = features.map((feature) => {
      const featureExist = previousFeatures.find((f) => f.id === feature.id);

      if (featureExist) {
        return {
          ...feature,
          isNew: featureExist?.isNew
        };
      } else {
        return {
          ...feature,
          isNew: true,
        };
      }
    });
    store.update(setEntities(updatedFeatures));
  } else {
    store.update(setEntities(features));
  }
};

export const updateFeaturesListIsNewToFalse = () => {
  const features = store.query(getAllEntities());
  const updatedFeatures = features.map((feature) => ({
    ...feature,
    isNew: false,
  }));
  store.update(setEntities(updatedFeatures));
};

export const updateFeatureIsNewToFalse = (menuItem: ServiceMenuItem) => {
  const feature = store.query(getEntity(menuItem.id));
  const updatedFeature = { ...feature, isNew: false };
  store.update(updateEntities(updatedFeature.id, () => (updatedFeature)));
};

export const setFeaturesUserOrder = (userOrder: FeaturesProps['userOrder']) => {
  store.update((state) => ({
    ...state,
    userOrder,
  }));
};

export const clearFeatures = () => store.reset();
