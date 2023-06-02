import { Injectable, Logger } from '@nestjs/common';
import { StatisticsUserActionDto, StatisticsExternalApiUserActionDto } from './statistics.dto';
import { UlApi } from './config/configuration.interfaces';
import { ConfigService } from '@nestjs/config';
import { HttpService } from '@nestjs/axios';
import { catchError, map } from 'rxjs';
import { RpcException } from "@nestjs/microservices";

@Injectable()
export class StatisticsService {
  private readonly logger = new Logger(StatisticsService.name);
  private ulApiConfig: UlApi;

  constructor(
    private readonly configService: ConfigService,
    private readonly httpService: HttpService,
  ) {
    this.ulApiConfig = this.configService.get<UlApi>('ulApi');
  }

  postUserActionStatistic(statData: StatisticsUserActionDto) {
    let mappedAction: string;
    switch(statData.action) {
      case 'OPEN':
        mappedAction = 'service_access';
        break;
      default:
        throw new RpcException(`Invalid action: ${statData.action}`);
    }

    const url = `${this.ulApiConfig.url}`;
    const options = {
      headers: {
        Accept: 'application/json',
        Authorization: `Bearer ${this.ulApiConfig.bearerToken}`,
        'User-Agent': statData.userAgent,
        'X-Forwarded-For': statData.xForwardedFor,
      },
    };

    const requestData: StatisticsExternalApiUserActionDto = {
      uid: statData.uid,
      duid: statData.platform != 'web' ? statData.duid : null,
      action: mappedAction,
      service: statData.functionality,
      platform: statData.platform,
      connection: statData.connectionType
    }

    return this.httpService.post<any>(url, requestData, options).pipe(
      catchError((err) => {
        const errorMessage = `Unable to send statistics for user '${requestData.uid ? requestData.uid : 'anonymous'}', action: ${statData.action}, functionality: ${statData.functionality}`;
        this.logger.error(errorMessage, err);
        throw new RpcException(errorMessage);
      }),
      map(() => void 0),
    );
  }
}
