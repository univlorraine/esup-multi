import { HttpService } from '@nestjs/axios';
import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { RpcException } from '@nestjs/microservices';
import { catchError, map, Observable } from 'rxjs';
import { DirectusApi } from '../../config/configuration.interface';
import { DirectusResponse, TileType } from '../tiles.dto';
import { DirectusApp, App } from './apps.dto';

@Injectable()
export class AppsService {
  private readonly logger = new Logger(AppsService.name);
  private directusApiConfig: DirectusApi;
  constructor(
    private readonly configService: ConfigService,
    private readonly httpService: HttpService,
  ) {
    this.directusApiConfig = this.configService.get<DirectusApi>('directusApi');
  }

  public getApps(): Observable<App[]> {
    const url = `${this.directusApiConfig.apiUrl}/items/apps`;

    return this.httpService
      .get<DirectusResponse<DirectusApp[]>>(url, {
        params: {
          'filter[status][_eq]': 'published',
          fields: '*,translations.*,authorization.*',
        },
        headers: {
          Accept: 'application/json',
          Authorization: `Bearer ${this.directusApiConfig.bearerToken}`,
        },
      })
      .pipe(
        catchError((err: any) => {
          const errorMessage = 'Unable to get directus data';
          this.logger.error(errorMessage, err);
          throw new RpcException(errorMessage);
        }),
        map((res) =>
          res.data.data.map(
            (info: DirectusApp): App => ({
              id: `${TileType.App}:${info.id}`,
              type: TileType.App,
              translations: info.translations,
              icon: info.icon,
              path: info.path,
              authorization: info.authorization,
            }),
          ),
        ),
      );
  }
}
