import { createStore, select, withProps } from '@ngneat/elf';
import {
  persistState
} from '@ngneat/elf-persist-state';
import { localForageStore } from '@ul/shared';

const STORE_NAME = 'clocking';

export interface ClockingProps {
  clocking: Clocking;
}

export interface Clocking {
  times: string[];
  day: string;
}


const store = createStore(
    { name: STORE_NAME },
    withProps<ClockingProps>({ clocking: null})
  );

export const persist = persistState(store, {
    key: STORE_NAME,
    storage: localForageStore,
});

export const clocking$ = store.pipe(select((state) => state.clocking));

export const setClocking = (clocking: ClockingProps['clocking']) => {
  store.update((state) => ({
    ...state,
    clocking,
  }));
};

export const clearUserClockingData = () => store.reset();
