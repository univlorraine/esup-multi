import { select, withProps } from '@ngneat/elf';
import { getAllEntities, getEntity, selectAllEntities, setEntities, updateEntities, withEntities } from '@ngneat/elf-entities';
import { mergeMap } from 'rxjs/operators';
import { Authorization } from '../authorization/authorization.helper';
import { ServiceMenuItem } from '../navigation/menu.model';
import { registerUserStore } from '../store/user-store-helper';


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
  iconSourceSvgLightTheme: string;
  iconSourceSvgDarkTheme: string;
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

const [userStore$, getUserStore] = registerUserStore(
  { name: STORE_NAME },
  withEntities<Feature>(),
  withProps<FeaturesProps>({
    userOrder: [],
  }),
);


export const features$ = userStore$.pipe(
  mergeMap(selectAllEntities()),
);
export const featuresUserOrder$ = userStore$.pipe(
  mergeMap(select((state: any) => state.userOrder))
);

export const setFeatures = (features: Feature[]) => {
  const previousFeatures = getUserStore().query(getAllEntities());

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
    getUserStore().update(setEntities(updatedFeatures));
  } else {
    getUserStore().update(setEntities(features));
  }
};

export const updateFeaturesListIsNewToFalse = () => {
  const features = getUserStore().query(getAllEntities());
  const updatedFeatures = features.map((feature) => ({
    ...feature,
    isNew: false,
  }));
  getUserStore().update(setEntities(updatedFeatures));
};

export const updateFeatureIsNewToFalse = (menuItem: ServiceMenuItem) => {
  const feature = getUserStore().query(getEntity(menuItem.id));
  const updatedFeature = { ...feature, isNew: false };
  getUserStore().update(updateEntities(updatedFeature.id, () => (updatedFeature)));
};

export const setFeaturesUserOrder = (userOrder: FeaturesProps['userOrder']) => {
  getUserStore().update((state) => ({
    ...state,
    userOrder,
  }));
};

export const clearFeatures = () => getUserStore().reset();
