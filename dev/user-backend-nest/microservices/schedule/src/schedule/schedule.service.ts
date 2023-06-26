import { HttpService } from '@nestjs/axios';
import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { RpcException } from '@nestjs/microservices';
import { catchError, map, Observable } from 'rxjs';
import { UlApi } from '../config/configuration.interface';
import { Schedule, UserScheduleQueryDto } from './schedule.dto';

@Injectable()
export class ScheduleService {
  private readonly logger = new Logger(ScheduleService.name);
  private ulApiConfig: UlApi;

  constructor(
    private readonly configService: ConfigService,
    private readonly httpService: HttpService,
  ) {
    this.ulApiConfig = this.configService.get<UlApi>('ulApi');
  }

  public getSchedule(query: UserScheduleQueryDto): Observable<Schedule> {
    const url = this.ulApiConfig.userScheduleUrl
      .replace(
        /\{username\}/g,
        this.isUserScheduleManager(query.roles) && query.asUser
          ? query.asUser
          : query.username,
      )
      .replace(/\{startDate\}/g, query.startDate)
      .replace(/\{endDate\}/g, query.endDate);

    return this.httpService
      .get<Schedule>(url, {
        headers: {
          Accept: 'application/json',
          Authorization: `Bearer ${this.ulApiConfig.bearerToken}`,
        },
      })
      .pipe(
        catchError((err: any) => {
          const errorMessage = `Unable to get schedule data with username '${query.username}'`;
          this.logger.error(errorMessage, err);
          throw new RpcException(errorMessage);
        }),
        map((res) => {
          return res.data;
        }),
      );
  }

  private isUserScheduleManager(userRoles: string[]) {
    return (
      userRoles?.length > 0 &&
      this.ulApiConfig.scheduleAdminRoles.some((role) =>
        userRoles.includes(role),
      )
    );
  }
}
