import { App } from './apps/apps.dto';
import { Info } from './info/info.dto';

export interface Authorization {
  type: 'ALLOW' | 'DISALLOW';
  roles: string[];
}

export interface DirectusTileTranslation {
  languages_code: string;
  title: string;
  content: string;
}

export interface DirectusSettingsByRole {
  settings_by_role_id: SettingsByRole;
}

export interface DirectusResponse<T> {
  data: T;
}

export enum TileType {
  App = 'app',
  Info = 'info',
}

export interface SettingsByRole {
  role: string;
  position: number;
}

export interface AbstractTile {
  id: string;
  type: TileType;
  position: number | null;
  widget: string;
  translations: DirectusTileTranslation[];
  authorization?: Authorization;
  settingsByRole: SettingsByRole[];
}

export type Tile = Info | App;
