import { HttpService } from '@nestjs/axios';
import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { RpcException } from '@nestjs/microservices';
import { catchError, map, Observable } from 'rxjs';
import { DirectusApi } from '../../config/configuration.interface';
import {
  DirectusResponse,
  LoginPageContentResultDto
} from './login-page-content.dto';

@Injectable()
export class LoginPageContentService {
  private readonly logger = new Logger(LoginPageContentService.name);
  private directusApiConfig: DirectusApi;

  constructor(
    private readonly configService: ConfigService,
    private readonly httpService: HttpService,
  ) {
    this.directusApiConfig = this.configService.get<DirectusApi>('directusApi');
  }

  public getLoginPageContent(): Observable<LoginPageContentResultDto> {
    const url = `${this.directusApiConfig.url}/items/login`;
    const requestConfig = {
      params: {
        fields: 'translations.*',
      },
      headers: {
        Accept: 'application/json',
        Authorization: `Bearer ${this.directusApiConfig.bearerToken}`,
      },
    };

    return this.httpService
      .get<DirectusResponse<LoginPageContentResultDto>>(url, requestConfig)
      .pipe(
        catchError((err: any) => {
          const errorMessage = 'Unable to get directus login page content';
          this.logger.error(errorMessage, err);
          throw new RpcException(errorMessage);
        }),
        map((res) => res.data.data),
      );
  }
}
