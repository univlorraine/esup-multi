import {
  AbstractTile,
  Authorization,
  DirectusTileTranslation,
  TileType,
} from '../tiles.dto';

export interface App extends AbstractTile {
  path: string;
  icon?: string;
  type: TileType.App;
}

export interface DirectusApp {
  id: number;
  translations: DirectusTileTranslation[];
  path: string;
  icon?: string;
  authorization?: Authorization;
}
