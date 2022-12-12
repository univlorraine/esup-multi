import { createStore, select, withProps } from '@ngneat/elf';
import {
  localStorageStrategy, persistState
} from '@ngneat/elf-persist-state';

const STORE_NAME = 'screen';

export interface Screen {
  brightness: number;
}

const store = createStore(
    { name: STORE_NAME },
    withProps<Screen>({ brightness: null})
  );

export const persist = persistState(store, {
    key: STORE_NAME,
    storage: localStorageStrategy,
});

export const brightness$ = store.pipe(select((state) => state.brightness));

export const setBrightness = (brightness: Screen['brightness']) => {
  store.update((state) => ({
    ...state,
    brightness,
  }));
};
