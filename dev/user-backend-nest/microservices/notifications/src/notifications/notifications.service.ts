import { HttpService } from '@nestjs/axios';
import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { RpcException } from '@nestjs/microservices';
import { catchError, map, Observable } from 'rxjs';
import { DirectusApi, UlApi } from 'src/config/configuration.interface';
import {
  ChannelSubscriberQueryDto,
  DirectusChannelResultDto,
  DirectusResponse,
  NotificationDeleteQueryDto,
  NotificationResultDto,
  NotificationsMarkAsReadQueryDto,
  NotificationsQueryDto,
  RegisterFCMTokenQueryDto,
  UnregisterFCMTokenQueryDto,
  UnsubscribedChannelsQueryDto,
  UnsubscribedChannelsResultDto,
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
  ): Observable<NotificationResultDto[]> {
    const url = `${this.ulApiConfig.notificationsUrl}/notifications/${query.username}?offset=${query.offset}&length=${query.length}`;

    return this.httpService
      .get<NotificationResultDto[]>(url, {
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

  public getChannels(): Observable<DirectusChannelResultDto[]> {
    const url = `${this.directusApiConfig.url}/items/channels`;

    return this.httpService
      .get<DirectusResponse<DirectusChannelResultDto[]>>(url, {
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

  public getUnsubscribedChannels(
    query: UnsubscribedChannelsQueryDto,
  ): Observable<string[]> {
    const url = `${this.ulApiConfig.notificationsUrl}/channels/${query.username}`;

    return this.httpService
      .get<UnsubscribedChannelsResultDto>(url, {
        headers: {
          Accept: 'application/json',
          Authorization: `Bearer ${this.ulApiConfig.bearerToken}`,
        },
      })
      .pipe(
        catchError((err) => {
          const errorMessage = `Unable to get user's unsubscribed channels with username '${query.username}'`;
          this.logger.error(errorMessage, err);
          throw new RpcException(errorMessage);
        }),
        map((res) => {
          return res.data.channels;
        }),
      );
  }

  public deleteNotification(query: NotificationDeleteQueryDto) {
    const url = `${this.ulApiConfig.notificationsUrl}/notifications`;

    return this.httpService
      .delete<NotificationResultDto[]>(url, {
        headers: {
          Accept: 'application/json',
          Authorization: `Bearer ${this.ulApiConfig.bearerToken}`,
        },
        data: query,
      })
      .pipe(
        catchError((err) => {
          const errorMessage = `Unable to delete user notification with id '${query.notificationId}' and username '${query.username}''`;
          this.logger.error(errorMessage, err);
          throw new RpcException(errorMessage);
        }),
        map((res) => {
          return res.status;
        }),
      );
  }

  markNotificationsAsRead(
    data: NotificationsMarkAsReadQueryDto,
  ): Observable<void> {
    const url = `${this.ulApiConfig.notificationsUrl}/notifications/read`;
    return this.httpService
      .post<void>(url, data, {
        headers: {
          Accept: 'application/json',
          Authorization: `Bearer ${this.ulApiConfig.bearerToken}`,
        },
      })
      .pipe(
        catchError((err) => {
          const errorMessage =
            'An error occurred while marking notifications as read';
          this.logger.error(errorMessage, err);
          throw new RpcException(errorMessage);
        }),
        map(() => void 0),
      );
  }

  subscribeOrUnsubscribeUserToChannels(
    query: ChannelSubscriberQueryDto,
  ): Observable<number> {
    const url = `${this.ulApiConfig.notificationsUrl}/channels`;
    const body = { ...query };
    const options = {
      headers: {
        Accept: 'application/json',
        Authorization: `Bearer ${this.ulApiConfig.bearerToken}`,
      },
    };

    return this.httpService.patch<any>(url, body, options).pipe(
      catchError((err) => {
        const errorMessage = `Unable to update unsubscribed channels ${JSON.stringify(
          query.channels,
        )} for user with username '${query.username}'`;
        this.logger.error(errorMessage, err);
        throw new RpcException(errorMessage);
      }),
      map((res) => {
        return res.status;
      }),
    );
  }

  saveFCMToken(query: RegisterFCMTokenQueryDto) {
    const url = `${this.ulApiConfig.notificationsUrl}/register`;
    const options = {
      headers: {
        Accept: 'application/json',
        Authorization: `Bearer ${this.ulApiConfig.bearerToken}`,
      },
    };
    return this.httpService.post<any>(url, query, options).pipe(
      catchError((err) => {
        const errorMessage = `Unable to save FCM Token from '${query.username}'`;
        this.logger.error(errorMessage, err);
        throw new RpcException(errorMessage);
      }),
      map((res) => {
        return res.status;
      }),
    );
  }

  unregisterFCMToken(query: UnregisterFCMTokenQueryDto) {
    const url = `${this.ulApiConfig.notificationsUrl}/unregister`;
    const options = {
      headers: {
        Accept: 'application/json',
        Authorization: `Bearer ${this.ulApiConfig.bearerToken}`,
      },
    };
    return this.httpService.post<any>(url, query, options).pipe(
      catchError((err) => {
        const errorMessage = `Unable to delete FCM Token from '${query.username}'`;
        this.logger.error(errorMessage, err);
        throw new RpcException(errorMessage);
      }),
      map((res) => {
        return res.status;
      }),
    );
  }
}
