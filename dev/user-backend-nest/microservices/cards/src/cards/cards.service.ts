import { HttpService } from '@nestjs/axios';
import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { RpcException } from '@nestjs/microservices';
import { catchError, map, Observable } from 'rxjs';
import { UlApi } from '../config/configuration.interface';
import { UserCardsDto } from './cards.dto';

@Injectable()
export class CardsService {
  private readonly logger = new Logger(CardsService.name);
  private ulApiConfig: UlApi;

  constructor(
    private readonly configService: ConfigService,
    private readonly httpService: HttpService,
  ) {
    this.ulApiConfig = this.configService.get<UlApi>('ulApi');
  }

  public getUserCards(username: string): Observable<UserCardsDto> {
    const url = this.ulApiConfig.userCardsUrl.replace(
      /\{username\}/g,
      username,
    );

    return this.httpService
      .get<UserCardsDto>(url, {
        headers: {
          Accept: 'application/json',
          Authorization: `Bearer ${this.ulApiConfig.bearerToken}`,
        },
      })
      .pipe(
        catchError((err) => {
          const errorMessage = `Unable to get user cards info with username '${username}'`;
          this.logger.error(errorMessage, err);
          throw new RpcException(errorMessage);
        }),
        map((res) => {
          return res.data;
        }),
      );
  }
}
