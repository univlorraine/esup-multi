import {
  AbstractTile,
  Authorization,
  DirectusSettingsByRole,
  DirectusTileTranslation,
  TileType
} from '../tiles.dto';

export interface App extends AbstractTile {
  routerLink: string;
  icon?: string;
  type: TileType.App;
}

export interface DirectusApp {
  id: number;
  translations: DirectusTileTranslation[];
  position: number | null;
  widget: string;
  routerLink: string;
  icon?: string;
  authorization?: Authorization;
  settings_by_role: DirectusSettingsByRole[];
}
