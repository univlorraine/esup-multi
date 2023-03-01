import { HttpService } from '@nestjs/axios';
import { AxiosError } from 'axios';
import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { RpcException } from '@nestjs/microservices';
import { catchError, map, Observable } from 'rxjs';
import { UlApi } from '../config/configuration.interface';
import { format } from 'date-fns';
import {
  ClockingQueryDto,
  ClockingReplyDto,
  ExternalApiClockingQueryDto,
  ExternalApiClockingReplyDto,
} from './clocking.dto';

const apiDayFormat = 'yyyy-MM-dd';
@Injectable()
export class ClockingService {
  private readonly logger = new Logger(ClockingService.name);
  private ulApiConfig: UlApi;

  constructor(
    private readonly configService: ConfigService,
    private readonly httpService: HttpService,
  ) {
    this.ulApiConfig = this.configService.get<UlApi>('ulApi');
  }

  private externalApiClocking(
    query: ClockingQueryDto,
    top: boolean,
  ): Observable<ClockingReplyDto> {
    const url = this.ulApiConfig.apiUrl;

    const now = new Date();

    const postData: ExternalApiClockingQueryDto = {
      login: query.username,
      ip: query.ip,
      top,
    };

    return this.httpService
      .post<ExternalApiClockingReplyDto>(url, postData, {
        headers: {
          accept: 'application/json',
          Authorization: `Bearer ${this.ulApiConfig.bearerToken}`,
        },
        responseType: 'json',
      })
      .pipe(
        catchError((err: AxiosError) => {
          const status = err.response.status;
          const externalApiMessage = err.response.data['message'];

          // Handle expected business errors from external API
          if ((status === 403 || status === 500) && externalApiMessage) {
            this.logger.warn(
              `User '${query.username}' got business error '${externalApiMessage}'`,
            );
            throw new RpcException(`[EXPECTED]${externalApiMessage}`);
          }

          // Unexpected error
          const errorMessage = `Unable to get clocking info with username '${query.username}' from ip '${query.ip}'`;
          this.logger.error(errorMessage, err);
          throw new RpcException(errorMessage);
        }),
        map((res) => {
          return {
            times: res.data,
            day: format(now, apiDayFormat),
          };
        }),
      );
  }

  public getClocking(query: ClockingQueryDto): Observable<ClockingReplyDto> {
    return this.externalApiClocking(query, false);
  }

  public clockIn(query: ClockingQueryDto): Observable<ClockingReplyDto> {
    return this.externalApiClocking(query, true);
  }
}
