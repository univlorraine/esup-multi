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

import { createStore, select, withProps } from '@ngneat/elf';
import { persistState } from '@ngneat/elf-persist-state';
import { localForageStore } from '@multi/shared';

const STORE_NAME = 'map_data';

export type MapData = MarkersCollectionsProps &
  CategoriesProps &
  CampusesProps &
  IconsProps;

export interface Translatable {
  translations?: Array<{
    languagesCode: string;
  }>;
}

export interface MarkersCollectionsProps {
  markersCollections: Record<string, Marker[]>;
}
export interface Marker extends Translatable {
  id: string;
  name: string;
  description: string;
  latitude: number;
  longitude: number;
  categoryId: string;
  campusId: string;
  iconId: string;
  translations?: Array<{
    languagesCode: string;
    name: string;
    description: string;
  }>;
}

interface CategoriesProps {
  categories: Category[];
}
export interface Category extends Translatable {
  id: string;
  label: string;
  translations?: Array<{
    languagesCode: string;
    label: string;
  }>;
}

interface CampusesProps {
  campuses: Campus[];
}
export interface Campus {
  id: string;
  name: string;
  photo: string | null;
  initial: GpsCoordinate;
  southwest: GpsCoordinate;
  northeast: GpsCoordinate;
}

export interface GpsCoordinate {
  lng: number;
  lat: number;
}

interface IconsProps {
  icons: Icon[];
}
export interface Icon {
  id: string;
  svg: string;
  width: number;
  height: number;
  x: number;
  y: number;
}

const store = createStore(
  { name: STORE_NAME },
  withProps<MarkersCollectionsProps>({ markersCollections: {} }),
  withProps<CategoriesProps>({ categories: [] }),
  withProps<CampusesProps>({ campuses: [] }),
  withProps<IconsProps>({ icons: [] }),
);

export const persist = persistState(store, {
  key: STORE_NAME,
  storage: localForageStore,
});

export const markersCollections$ = store.pipe(select((state) => state.markersCollections));
export const categories$ = store.pipe(select((state) => state.categories));
export const campuses$ = store.pipe(select((state) => state.campuses));
export const icons$ = store.pipe(select((state) => state.icons));

export const setData = (data: MapData) => {
  store.update((state) => ({
    ...state,
    markersCollections: data ? data.markersCollections : {},
    categories: data ? data.categories : [],
    campuses: data ? data.campuses : [],
    icons: data ? data.icons : [],
  }));
}
