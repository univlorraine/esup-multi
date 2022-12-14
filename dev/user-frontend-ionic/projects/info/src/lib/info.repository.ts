import { createStore } from '@ngneat/elf';
import { withEntities, selectAllEntities, setEntities } from '@ngneat/elf-entities';
import {
    persistState,
  } from '@ngneat/elf-persist-state';
import { localForageStore } from '@ul/shared';

const STORE_NAME = 'info';

export interface Info {
    id: number;
    title: string;
    content: string;
    link?: string;
    ssoService?: string;
}

const infoStore = createStore(
    { name: STORE_NAME },
    withEntities<Info>()
  );

export const persist = persistState(infoStore, {
    key: STORE_NAME,
    storage: localForageStore,
});

export const infoList$ = infoStore.pipe(selectAllEntities());

export const setInfoList = (infoList: Info[]) => {
    infoStore.update(setEntities(infoList));
};
