import { HttpService } from '@nestjs/axios';
import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { RpcException } from '@nestjs/microservices';
import { catchError, map, Observable } from 'rxjs';
import { DirectusApi } from 'src/config/configuration.interface';
import {
  DirectusResponse,
  DirectusStaticPageResultDto,
} from './static-pages.dto';

@Injectable()
export class StaticPagesService {
  private readonly logger = new Logger(StaticPagesService.name);
  private directusApiConfig: DirectusApi;

  constructor(
    private readonly configService: ConfigService,
    private readonly httpService: HttpService,
  ) {
    this.directusApiConfig = this.configService.get<DirectusApi>('directusApi');
  }

  getStaticPages(): Observable<DirectusStaticPageResultDto[]> {
    const url = `${this.directusApiConfig.url}/items/pages`;

    return this.httpService
      .get<DirectusResponse<DirectusStaticPageResultDto[]>>(url, {
        params: {
          fields: '*,translations.*',
        },
        headers: {
          Accept: 'application/json',
          Authorization: `Bearer ${this.directusApiConfig.bearerToken}`,
        },
      })
      .pipe(
        catchError((err: any) => {
          const errorMessage = 'Unable to get directus static pages data';
          this.logger.error(errorMessage, err);
          throw new RpcException(errorMessage);
        }),
        map((res) => res.data.data),
      );
  }
}
