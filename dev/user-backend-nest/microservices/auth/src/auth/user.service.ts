import { HttpService } from '@nestjs/axios';
import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { RpcException } from '@nestjs/microservices';
import { Observable } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { UlApi } from '../config/configuration.interface';
import { UserProfileDto } from './auth.dto';

@Injectable()
export class UserService {
  private readonly logger = new Logger(UserService.name);
  private ulApiConfig: UlApi;

  constructor(
    private readonly configService: ConfigService,
    private readonly httpService: HttpService,
  ) {
    this.ulApiConfig = this.configService.get<UlApi>('ulApi');
  }

  public getUserProfile(username: string): Observable<UserProfileDto> {
    const url = this.ulApiConfig.userProfileUrl.replace(
      /\{username\}/g,
      username,
    );

    return this.httpService
      .get<UserProfileDto>(url, {
        headers: {
          Accept: 'application/json',
          Authorization: `Bearer ${this.ulApiConfig.bearerToken}`,
        },
      })
      .pipe(
        catchError((err) => {
          const errorMessage = `Unable to get user profile info with username '${username}'`;
          this.logger.error(errorMessage, err);
          throw new RpcException(errorMessage);
        }),
        map((res) => res.data),
      );
  }
}
