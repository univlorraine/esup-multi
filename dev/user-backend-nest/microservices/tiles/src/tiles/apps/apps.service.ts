import { HttpService } from '@nestjs/axios';
import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { RpcException } from '@nestjs/microservices';
import { catchError, map, Observable } from 'rxjs';
import { DirectusApi } from '../../config/configuration.interface';
import { DirectusResponse, TileType } from '../tiles.dto';
import { App, DirectusApp } from './apps.dto';

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
          fields:
            '*,translations.*,authorization.*,settings_by_role.settings_by_role_id.*',
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
            (app: DirectusApp): App => ({
              id: `${TileType.App}:${app.id}`,
              type: TileType.App,
              position: app.position,
              translations: app.translations,
              widget: app.widget,
              icon: app.icon,
              routerLink: app.routerLink,
              authorization: app.authorization,
              settingsByRole: app.settings_by_role.map(
                (sbr) => sbr.settings_by_role_id,
              ),
            }),
          ),
        ),
      );
  }
}
