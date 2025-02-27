/*
 * Copyright ou © ou Copr. Université de Lorraine, (2022)
 *
 * Direction du Numérique de l'Université de Lorraine - SIED
 *  (dn-mobile-dev@univ-lorraine.fr)
 * JNESIS (contact@jnesis.com)
 *
 * Ce logiciel est un programme informatique servant à rendre accessible
 * sur mobile divers services universitaires aux étudiants et aux personnels
 * de l'université.
 *
 * Ce logiciel est régi par la licence CeCILL 2.1, soumise au droit français
 * et respectant les principes de diffusion des logiciels libres. Vous pouvez
 * utiliser, modifier et/ou redistribuer ce programme sous les conditions
 * de la licence CeCILL telle que diffusée par le CEA, le CNRS et INRIA
 * sur le site "http://cecill.info".
 *
 * En contrepartie de l'accessibilité au code source et des droits de copie,
 * de modification et de redistribution accordés par cette licence, il n'est
 * offert aux utilisateurs qu'une garantie limitée. Pour les mêmes raisons,
 * seule une responsabilité restreinte pèse sur l'auteur du programme, le
 * titulaire des droits patrimoniaux et les concédants successifs.
 *
 * À cet égard, l'attention de l'utilisateur est attirée sur les risques
 * associés au chargement, à l'utilisation, à la modification et/ou au
 * développement et à la reproduction du logiciel par l'utilisateur étant
 * donné sa spécificité de logiciel libre, qui peut le rendre complexe à
 * manipuler et qui le réserve donc à des développeurs et des professionnels
 * avertis possédant des connaissances informatiques approfondies. Les
 * utilisateurs sont donc invités à charger et à tester l'adéquation du
 * logiciel à leurs besoins dans des conditions permettant d'assurer la
 * sécurité de leurs systèmes et/ou de leurs données et, plus généralement,
 * à l'utiliser et à l'exploiter dans les mêmes conditions de sécurité.
 *
 * Le fait que vous puissiez accéder à cet en-tête signifie que vous avez
 * pris connaissance de la licence CeCILL 2.1, et que vous en avez accepté les
 * termes.
 */

import { select, withProps } from '@ngneat/elf';
import { getAllEntities, getEntity, selectAllEntities, setEntities, updateEntities, withEntities } from '@ngneat/elf-entities';
import { mergeMap } from 'rxjs/operators';
import { Authorization } from '../authorization/authorization.helper';
import { ServiceMenuItem } from '../navigation/menu.model';
import { registerUserStore, isUserStoreInitialized$ } from '../store/user-store-helper';


const STORE_NAME = 'features';

export type FeatureMenuType = 'top' | 'tabs' | 'burger' | 'service';

export enum FeatureType {
  internal = 'internal',
  external = 'external',
}

interface Translation {
  languagesCode: string;
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
  iconSvgLight: string;
  iconSvgDark: string;
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
export const isFeatureStoreInitialized$ = isUserStoreInitialized$(STORE_NAME);

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
