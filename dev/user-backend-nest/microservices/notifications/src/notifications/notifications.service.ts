/*
 * Copyright ou © ou Copr. Université de Lorraine, (2022)
 *
 * Direction du Numérique de l'Université de Lorraine - SIED
 *  (dn-mobile-dev@univ-lorraine.fr)
 * JNESIS (contact@jnesis.com)
 *
 * Ce logiciel est un programme informatique servant à rendre accessible
 * sur mobile divers services universitaires aux étudiants et aux personnels
 * de l'université.
 *
 * Ce logiciel est régi par la licence CeCILL 2.1, soumise au droit français
 * et respectant les principes de diffusion des logiciels libres. Vous pouvez
 * utiliser, modifier et/ou redistribuer ce programme sous les conditions
 * de la licence CeCILL telle que diffusée par le CEA, le CNRS et INRIA
 * sur le site "http://cecill.info".
 *
 * En contrepartie de l'accessibilité au code source et des droits de copie,
 * de modification et de redistribution accordés par cette licence, il n'est
 * offert aux utilisateurs qu'une garantie limitée. Pour les mêmes raisons,
 * seule une responsabilité restreinte pèse sur l'auteur du programme, le
 * titulaire des droits patrimoniaux et les concédants successifs.
 *
 * À cet égard, l'attention de l'utilisateur est attirée sur les risques
 * associés au chargement, à l'utilisation, à la modification et/ou au
 * développement et à la reproduction du logiciel par l'utilisateur étant
 * donné sa spécificité de logiciel libre, qui peut le rendre complexe à
 * manipuler et qui le réserve donc à des développeurs et des professionnels
 * avertis possédant des connaissances informatiques approfondies. Les
 * utilisateurs sont donc invités à charger et à tester l'adéquation du
 * logiciel à leurs besoins dans des conditions permettant d'assurer la
 * sécurité de leurs systèmes et/ou de leurs données et, plus généralement,
 * à l'utiliser et à l'exploiter dans les mêmes conditions de sécurité.
 *
 * Le fait que vous puissiez accéder à cet en-tête signifie que vous avez
 * pris connaissance de la licence CeCILL 2.1, et que vous en avez accepté les
 * termes.
 */

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
