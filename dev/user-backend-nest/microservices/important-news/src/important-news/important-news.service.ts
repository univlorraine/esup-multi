import { HttpService } from '@nestjs/axios';
import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { RpcException } from '@nestjs/microservices';
import { catchError, map, Observable } from 'rxjs';
import { DirectusApi } from '../config/configuration.interface';
import { DirectusImportantNews, DirectusResponse } from './important-news.dto';

@Injectable()
export class ImportantNewsService {
  private readonly logger = new Logger(ImportantNewsService.name);
  private directusApiConfig: DirectusApi;

  constructor(
    private readonly configService: ConfigService,
    private readonly httpService: HttpService,
  ) {
    this.directusApiConfig = this.configService.get<DirectusApi>('directusApi');
  }

  public getImportantNews(): Observable<DirectusImportantNews[]> {
    const url = `${this.directusApiConfig.url}/items/important_news`;

    return this.httpService
      .get<DirectusResponse<DirectusImportantNews[]>>(url, {
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
          const errorMessage = 'Unable to get directus important news data';
          this.logger.error(errorMessage, err);
          throw new RpcException(errorMessage);
        }),
        map((res) => {
          return res.data.data;
        }),
      );
  }
}
