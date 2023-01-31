import { Injectable, Logger } from '@nestjs/common';
import { map, Observable, zip } from 'rxjs';
import { DirectusApi } from '../config/configuration.interface';
import { AppsService } from './apps/apps.service';
import { InfoService } from './info/info.service';
import { Tile } from './tiles.dto';

@Injectable()
export class TilesService {
  private readonly logger = new Logger(TilesService.name);
  private directusApiConfig: DirectusApi;
  constructor(
    private readonly infoService: InfoService,
    private readonly appsService: AppsService,
  ) { }

  public getTiles(): Observable<Tile[]> {
    return zip([this.infoService.getInfo(), this.appsService.getApps()]).pipe(
      // Le tri sur tile.position gère les cas où la valeur de position d'une tile est null en plaçant celle-ci
      // à la fin de la liste. Pour la placer au début de la liste, inversez les signes de retour (1 et -1)."
      map(([infoList, apps]) => [...apps, ...infoList].sort((a, b) => {
        const positionA = a.position ? a.position : Number.MAX_VALUE;
        const positionB = b.position ? b.position : Number.MAX_VALUE;

        return positionA - positionB;
      })));
  }
}
