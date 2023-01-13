import { Injectable, Logger } from '@nestjs/common';
import { map, Observable } from 'rxjs';
import { DirectusApi } from '../config/configuration.interface';
import { AppsService } from './apps/apps.service';
import { InfoService } from './info/info.service';
import { Tile } from './tiles.dto';
import { zip } from 'rxjs';

@Injectable()
export class TilesService {
  private readonly logger = new Logger(TilesService.name);
  private directusApiConfig: DirectusApi;
  constructor(
    private readonly infoService: InfoService,
    private readonly appsService: AppsService,
  ) {}

  public getTiles(): Observable<Tile[]> {
    return zip([this.infoService.getInfo(), this.appsService.getApps()]).pipe(
      map(([infoList, apps]) => [...apps, ...infoList]),
    );
  }
}
