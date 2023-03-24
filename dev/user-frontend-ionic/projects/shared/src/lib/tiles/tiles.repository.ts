import { createStore } from '@ngneat/elf';
import { selectAllEntities, setEntities, withEntities } from '@ngneat/elf-entities';
import {
  persistState
} from '@ngneat/elf-persist-state';
import { Authorization } from '../authorization/authorization.helper';
import { localForageStore } from '../store/local-forage';


const STORE_NAME = 'tiles';

export type TileMenuType = 'top' | 'tabs' | 'burger' | 'service';

export enum TileType {
  app = 'app',
  info = 'info',
}

interface Translation {
  // eslint-disable-next-line @typescript-eslint/naming-convention
  languages_code: string;
  title: string;
  content?: string;
  searchKeywords?: string[];
}

interface AbstractTile {
  id: string;
  type: TileType;
  widget: string;
  translations: Translation[];
  authorization?: Authorization;
  menu: TileMenuType;
  icon: string;
}

export interface App extends AbstractTile {
  routerLink: string;
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

const persist = persistState(store, {
  key: STORE_NAME,
  storage: localForageStore,
});

export const tiles$ = store.pipe(selectAllEntities());

export const setTiles = (tiles: Tile[]) => {
  store.update(setEntities(tiles));
};

export const clearTiles = () => store.reset();
