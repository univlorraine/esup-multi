import { createStore } from '@ngneat/elf';
import { selectAllEntities, setEntities, withEntities } from '@ngneat/elf-entities';
import {
  persistState
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

interface Translation {
  // eslint-disable-next-line @typescript-eslint/naming-convention
  languages_code: string;
  title: string;
  content: string;
}

interface AbstractTile {
  id: string;
  type: TileType;
  widget: string;
  translations: Translation[];
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

interface AbstractTranslatedTile {
  id: string;
  type: TileType;
  widget: string;
  title: string;
  content: string;
  authorization?: Authorization;
}

export interface TranslatedApp extends AbstractTranslatedTile {
  path: string;
  icon?: string;
  type: TileType.app;
}

export interface TranslatedInfo extends AbstractTranslatedTile {
  link?: string;
  ssoService?: string;
  type: TileType.info;
}

export type Tile = Info | App;
export type TranslatedTile = TranslatedInfo | TranslatedApp;

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

export const clearTiles = () => store.reset();
