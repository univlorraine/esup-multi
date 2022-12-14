import { createStore, select, withProps } from '@ngneat/elf';
import {
 persistState
} from '@ngneat/elf-persist-state';
import { localForageStore } from '@ul/shared';

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
    storage: localForageStore,
});

export const brightness$ = store.pipe(select((state) => state.brightness));

export const setBrightness = (brightness: Screen['brightness']) => {
  store.update((state) => ({
    ...state,
    brightness,
  }));
};
