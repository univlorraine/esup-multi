import { createStore, select, setProps, withProps } from '@ngneat/elf';
import { selectAllEntities, setEntities, withEntities } from '@ngneat/elf-entities';
import { persistState } from '@ngneat/elf-persist-state';
import { localForageStore } from '@ul/shared';

interface RestaurantsProps {
  favoriteRestaurantId: string | null;
}

export interface Restaurant {
    id: string;
    title: string;
    thumbnailUrl: string;
    shortDesc: string;
    open: boolean;
    opening: string;
    latitude: number;
    longitude: number;
}

const STORE_NAME = 'restaurants';

const store = createStore(
    { name: STORE_NAME },
    withEntities<Restaurant>(),
    withProps<RestaurantsProps>({
      favoriteRestaurantId: null
    })
);

export const persist = persistState(store, {
  key: STORE_NAME,
  storage: localForageStore,
});

export const restaurants$ = store.pipe(selectAllEntities());

export const setRestaurants = (restaurants: Restaurant[]) => {
  store.update(setEntities(restaurants));
};

export const clearRestaurant = () => store.reset();

export const setFavoriteRestaurant = (restaurantId: string) => {
  store.update(
    setProps({
      favoriteRestaurantId: restaurantId,
    })
  );
};

export const favoriteRestaurantId$ = store.pipe(select((state) => state.favoriteRestaurantId));

