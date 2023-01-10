import { App } from './apps/apps.dto';
import { Info } from './info/info.dto';

export interface Authorization {
  type: 'ALLOW' | 'DISALLOW';
  roles: string[];
}

export interface DirectusTileTranslation {
  title: string;
  content: string;
}

export interface DirectusResponse<T> {
  data: T;
}

export enum TileType {
  App = 'app',
  Info = 'info',
}

export interface AbstractTile {
  id: string;
  type: TileType;
  title: string;
  content: string;
  authorization?: Authorization;
}

export type Tile = Info | App;
