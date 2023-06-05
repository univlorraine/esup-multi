import { createStore } from '@ngneat/elf';
import { selectManyByPredicate, upsertEntities, withEntities } from '@ngneat/elf-entities';
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

export const upsertMenus = (menus: Menu[]) => store.update(upsertEntities(menus));

//@TODO quand l'API de l'UL sera en place, prévoir une méthode qui nettoie les menus dont la date est dans le passé
