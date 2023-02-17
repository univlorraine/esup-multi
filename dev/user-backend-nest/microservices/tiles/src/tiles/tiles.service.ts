import { Injectable, Logger } from '@nestjs/common';
import { map, Observable, zip } from 'rxjs';
import { AppsService } from './apps/apps.service';
import { InfoService } from './info/info.service';
import { TilesPositionHelper } from './tiles-position.helper';
import { Tile } from './tiles.dto';

@Injectable()
export class TilesService {
  private readonly logger = new Logger(TilesService.name);
  constructor(
    private readonly infoService: InfoService,
    private readonly appsService: AppsService,
  ) {}

  public getTiles(userRoles: string[]): Observable<Tile[]> {
    const tilesPositionHelper = new TilesPositionHelper(userRoles);

    return zip([this.infoService.getInfo(), this.appsService.getApps()]).pipe(
      map(([infoList, apps]) =>
        [...apps, ...infoList].sort((a, b) => {
          const nullablePositionA = tilesPositionHelper.getTilePosition(a);
          const nullablePositionB = tilesPositionHelper.getTilePosition(b);

          const positionA = nullablePositionA
            ? nullablePositionA
            : Number.MAX_VALUE;
          const positionB = nullablePositionB
            ? nullablePositionB
            : Number.MAX_VALUE;

          return positionA - positionB;
        }),
      ),
    );
  }
}
