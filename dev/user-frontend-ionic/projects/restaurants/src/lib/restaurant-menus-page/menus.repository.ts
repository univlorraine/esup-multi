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

import { createStore } from '@ngneat/elf';
import { selectManyByPredicate, setEntities, upsertEntities, withEntities } from '@ngneat/elf-entities';
import { persistState } from '@ngneat/elf-persist-state';
import { localForageStore } from '@ul/shared';


export interface Menu {
  id: number;
  // eslint-disable-next-line @typescript-eslint/naming-convention
  restaurant_id: number;
  date: string;
  meal: Meal[];
}

export interface Meal {
  name: string;
  foodcategory: FoodCategory[];
}

export interface FoodCategory {
  name: string;
  dishes: string[];
}

const STORE_NAME = 'menus';

const store = createStore(
  { name: STORE_NAME },
  withEntities<Menu>(),
);

export const persist = persistState(store, {
  key: STORE_NAME,
  storage: localForageStore,
});

export const getMenusByRestaurantId = (restaurantId: number) =>
  store.pipe(selectManyByPredicate((menu) => menu.restaurant_id === restaurantId));

export const upsertMenus = (menus: Menu[]) => {
  store.update(upsertEntities(menus));
  cleanMenus();
};

export const cleanMenus = () => {
  const now = new Date();
  const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
  store.update(setEntities(Object.values(store.state.entities)
    .filter((menu) => {
      const date = new Date(menu.date);
      const dateWithoutTime = new Date(date.getFullYear(), date.getMonth(), date.getDate());
      return today <= dateWithoutTime;
    })
    .sort((a, b) => new Date(a.date) > new Date(b.date) ? 1 : -1)
  ));
};
