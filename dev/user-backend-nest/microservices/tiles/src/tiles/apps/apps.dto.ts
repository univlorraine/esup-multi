import {
  AbstractTile,
  Authorization,
  DirectusSettingsByRole,
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
  position: number | null;
  widget: string;
  path: string;
  icon?: string;
  authorization?: Authorization;
  settings_by_role: DirectusSettingsByRole[];
}
