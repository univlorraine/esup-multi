import { createStore } from '@ngneat/elf';
import { withEntities, selectAllEntities, setEntities } from '@ngneat/elf-entities';
import {
    persistState,
  } from '@ngneat/elf-persist-state';
import { localForageStore } from '@ul/shared';

const STORE_NAME = 'tiles';

interface Authorization {
  type: 'ALLOW' | 'DISALLOW';
  roles: string[];
}


export enum TileType {
  app = 'app',
  info = 'info',
}

interface AbstractTile {
  id: string;
  type: TileType;
  title: string;
  content: string;
  authorization?: Authorization;
}

export interface App extends AbstractTile {
  path: string;
  icon?: string;
  type: TileType.app;
}

export interface Info extends AbstractTile {
  link?: string;
  ssoService?: string;
  type: TileType.info;
}

export type Tile = Info | App;

const store = createStore(
    { name: STORE_NAME },
    withEntities<Tile>()
  );

export const persist = persistState(store, {
    key: STORE_NAME,
    storage: localForageStore,
});

export const tiles$ = store.pipe(selectAllEntities());

export const setTiles = (tiles: Tile[]) => {
    store.update(setEntities(tiles));
};
