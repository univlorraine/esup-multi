import { Injectable, Logger } from '@nestjs/common';
import { UlApi } from '../config/configuration.interface';
import { ConfigService } from '@nestjs/config';
import { HttpService } from '@nestjs/axios';
import { catchError, map, Observable, of } from 'rxjs';
import {
  MailCalendarQueryDto,
  MailCalendarReplyDto,
} from './mail-calendar.dto';
import { RpcException } from '@nestjs/microservices';

@Injectable()
export class MailCalendarService {
  private readonly logger = new Logger(MailCalendarService.name);
  private ulApiConfig: UlApi;

  constructor(
    private readonly configService: ConfigService,
    private readonly httpService: HttpService,
  ) {
    this.ulApiConfig = this.configService.get<UlApi>('ulApi');
  }

  public getMailCalendar(
    query: MailCalendarQueryDto,
  ): Observable<MailCalendarReplyDto> {
    const url = `${this.ulApiConfig.apiUrl}/${query.login}`;

    return this.httpService
      .get<MailCalendarReplyDto>(url, {
        headers: {
          Authorization: `Bearer ${this.ulApiConfig.bearerToken}`,
        },
        responseType: 'json',
      })
      .pipe(
        catchError((err: any) => {
          if (err.response && err.response.status === 404) {
            const data: MailCalendarReplyDto = {
              error: 'NO_MAIL_ACCOUNT',
              unreadMails: null,
              events: [],
            };
            return of({ data });
          }

          const errorMessage = `Unable to get mails and calendar data with username '${query.login}'`;
          this.logger.error(errorMessage, err);
          throw new RpcException(errorMessage);
        }),
        map((res) => {
          return res.data;
        }),
      );
  }
}
