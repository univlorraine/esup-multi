import { createStore } from '@ngneat/elf';
import { withEntities, selectAllEntities, setEntities } from '@ngneat/elf-entities';
import {
    persistState,
    localStorageStrategy,
  } from '@ngneat/elf-persist-state';

const STORE_NAME = 'info';

export interface Info {
    id: number;
    title: string;
    content: string;
    link?: string;
}

const infoStore = createStore(
    { name: STORE_NAME },
    withEntities<Info>()
  );

export const persist = persistState(infoStore, {
    key: STORE_NAME,
    storage: localStorageStrategy,
});

export const infoList$ = infoStore.pipe(selectAllEntities());;

export const setInfoList = (infoList: Info[]) => {
    infoStore.update(setEntities(infoList));
}
