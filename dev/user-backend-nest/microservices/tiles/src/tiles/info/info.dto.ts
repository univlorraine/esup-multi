import { AbstractTile, Authorization, DirectusTileTranslation, TileType } from '../tiles.dto';
 
export interface Info extends AbstractTile {
  link?: string;
  ssoService?: string;
  type: TileType.Info;
}

export interface DirectusInfo {
  id: number;
  translations: DirectusTileTranslation[];
  link?: string;
  ssoService?: string;
  authorization?: Authorization;
}
