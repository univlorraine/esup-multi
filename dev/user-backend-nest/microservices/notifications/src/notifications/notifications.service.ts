import { HttpService } from '@nestjs/axios';
import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { RpcException } from '@nestjs/microservices';
import { catchError, map, Observable } from 'rxjs';
import { DirectusApi, UlApi } from 'src/config/configuration.interface';
import {
  DirectusChannel,
  DirectusResponse,
  NotificationDto,
  NotificationsQueryDto,
} from './notifications.dto';

@Injectable()
export class NotificationsService {
  private readonly logger = new Logger(NotificationsService.name);
  private ulApiConfig: UlApi;
  private directusApiConfig: DirectusApi;

  constructor(
    private readonly configService: ConfigService,
    private readonly httpService: HttpService,
  ) {
    this.ulApiConfig = this.configService.get<UlApi>('ulApi');
    this.directusApiConfig = this.configService.get<DirectusApi>('directusApi');
  }

  public getNotifications(
    query: NotificationsQueryDto,
  ): Observable<NotificationDto[]> {
    const url = this.ulApiConfig.notificationsUrl
      .replace(/\{username\}/g, query.username)
      .replace(/\{offset\}/g, query.offset.toString())
      .replace(/\{length\}/g, query.length.toString());

    return this.httpService
      .get<NotificationDto[]>(url, {
        headers: {
          Accept: 'application/json',
          Authorization: `Bearer ${this.ulApiConfig.bearerToken}`,
        },
      })
      .pipe(
        catchError((err) => {
          const errorMessage = `Unable to get user notifications with username '${query.username}'`;
          this.logger.error(errorMessage, err);
          throw new RpcException(errorMessage);
        }),
        map((res) => {
          return res.data;
        }),
      );
  }

  public getChannels(): Observable<DirectusChannel[]> {
    const url = `${this.directusApiConfig.url}/items/channels`;

    return this.httpService
      .get<DirectusResponse<DirectusChannel[]>>(url, {
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
          const errorMessage = 'Unable to get directus channels data';
          this.logger.error(errorMessage, err);
          throw new RpcException(errorMessage);
        }),
        map((res) => res.data.data),
      );
  }
}
