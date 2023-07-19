import { Injectable, Logger } from '@nestjs/common';
import { catchError, map, Observable } from 'rxjs';
import { ConfigService } from '@nestjs/config';
import { HttpService } from '@nestjs/axios';
import { DirectusResponse, SocialNetworkDto } from './social-network.dto';
import { DirectusApi } from '../config/configuration.interface';
import { RpcException } from '@nestjs/microservices';

@Injectable()
export class SocialNetworkService {
  private readonly logger = new Logger(SocialNetworkService.name);
  private directusApiConfig: DirectusApi;
  constructor(
    private readonly configService: ConfigService,
    private readonly httpService: HttpService,
  ) {
    this.directusApiConfig = this.configService.get<DirectusApi>('directusApi');
  }

  public getSocialNetworks(): Observable<SocialNetworkDto[]> {
    this.logger.log('get social networks');
    const url = `${this.directusApiConfig.apiUrl}/items/social_networks`;
    return this.httpService
      .get<DirectusResponse<SocialNetworkDto[]>>(url, {
        headers: {
          Accept: 'application/json',
          Authorization: `Bearer ${this.directusApiConfig.bearerToken}`,
        },
      })
      .pipe(
        catchError((err: any) => {
          const errorMessage = 'Unable to get directus social networks data';
          this.logger.error(errorMessage, err);
          throw new RpcException(errorMessage);
        }),
        map((res) => {
          return res.data.data;
        }),
      );
  }
}
