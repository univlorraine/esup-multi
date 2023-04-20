import { HttpService } from '@nestjs/axios';
import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Observable, catchError, map } from 'rxjs';
import { DirectusApi } from 'src/config/configuration.interface';
import { PageContentResultDto } from './page-content.dto';
import { DirectusResponse } from 'src/common/common.dto';
import { RpcException } from '@nestjs/microservices';

@Injectable()
export class PageContentService {
  private readonly logger = new Logger(PageContentService.name);
  private directusApiConfig: DirectusApi;

  constructor(
    private readonly configService: ConfigService,
    private readonly httpService: HttpService,
  ) {
    this.directusApiConfig = this.configService.get<DirectusApi>('directusApi');
  }

  public getPageContent(): Observable<PageContentResultDto> {
    const url = `${this.directusApiConfig.url}/items/contact_us`;
    const requestConfig = {
      params: {
        fields: 'icon,translations.*',
      },
      headers: {
        Accept: 'application/json',
        Authorization: `Bearer ${this.directusApiConfig.bearerToken}`,
      },
    };

    return this.httpService
      .get<DirectusResponse<PageContentResultDto>>(url, requestConfig)
      .pipe(
        catchError((err: any) => {
          const errorMessage = 'Unable to get directus contact-us';
          this.logger.error(errorMessage, err);
          throw new RpcException(errorMessage);
        }),
        map((res) => res.data.data),
      );
  }
}
