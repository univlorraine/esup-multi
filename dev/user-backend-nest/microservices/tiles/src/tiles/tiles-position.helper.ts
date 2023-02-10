import { Tile } from './tiles.dto';

export class TilesPositionHelper {
  constructor(private userRoles: string[]) {}

  public getTilePosition(tile: Tile): number {
    const settingsByRole = tile.settingsByRole.find((sbr) =>
      this.userRoles.includes(sbr.role),
    );
    return settingsByRole ? settingsByRole.position : tile.position;
  }
}
