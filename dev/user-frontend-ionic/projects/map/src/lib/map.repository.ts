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
import {
    persistState
} from '@ngneat/elf-persist-state';
import { localForageStore } from '@multi/shared';

const STORE_NAME = 'map_data';

export interface MarkersProps {
    markers: Marker[];
}
export interface Marker {
    title: Label[];
    description: Label[];
    title_translate?: string;
    description_translate?: string;
    category: string;
    latitude: number;
    longitude: number;
    icon: Icon;
}

export interface CategoriesProps {
    categories: Categorie[];
}
export interface Categorie {
    id: string;
    sort: number;
    label: Label[];
    label_translate?: string;
}

export interface CampusProps {
    campus: Campus[];
}
export interface Campus {
    id: number;
    sort: number;
    name: string;
    initial: GpsCoordinate;
    southwest: GpsCoordinate;
    northeast: GpsCoordinate;
    photo: string;
}

export interface Label {
    value: string;
    langcode: string;
}

export interface GpsCoordinate {
    lng: number;
    lat: number;
}

export interface Icon {
    svg: string;
    width: number;
    height: number;
    x: number;
    y: number;
}

const store = createStore(
    { name: STORE_NAME },
    withProps<MarkersProps>({ markers: []}),
    withProps<CategoriesProps>({ categories: []}),
    withProps<CampusProps>({ campus: []}),
  );

export const persist = persistState(store, {
    key: STORE_NAME,
    storage: localForageStore,
});

export const markersList$ = store.pipe(select((state) => state.markers));
export const categoriesList$ = store.pipe(select((state) => state.categories));
export const campusList$ = store.pipe(select((state) => state.campus));

export const setMarkers = (markers: MarkersProps['markers']) => {
    store.update((state) => ({
      ...state,
      markers,
    }));
};

export const setCategories = (categories: CategoriesProps['categories']) => {
    store.update((state) => ({
      ...state,
      categories,
    }));
};

export const setCampus = (campus: CampusProps['campus']) => {
    store.update((state) => ({
      ...state,
      campus,
    }));
};
