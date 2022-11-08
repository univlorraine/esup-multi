import { HttpService } from '@nestjs/axios';
import { Injectable, Logger, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { RpcException } from '@nestjs/microservices';
import { Observable } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { CasUrl } from '../config/configuration.interface';
import { AuthenticateQueryDto, SsoServiceTokenQueryDto } from './auth.dto';

const CAS_HEADERS = {
  accept: 'application/json',
  'content-type': 'application/x-www-form-urlencoded',
};

@Injectable()
export class CasService {
  private readonly logger = new Logger(CasService.name);
  private casUrlConfig: CasUrl;

  constructor(
    private readonly configService: ConfigService,
    private readonly httpService: HttpService,
  ) {
    this.casUrlConfig = this.configService.get<CasUrl>('casUrl');
  }

  public requestTgt(query: AuthenticateQueryDto): Observable<string> {
    const params = new URLSearchParams();
    params.append('username', query.username);
    params.append('password', query.password);
    return this.httpService
      .post<string>(this.casUrlConfig.requestTgt, params, {
        headers: CAS_HEADERS,
      })
      .pipe(
        catchError((err) => {
          switch (err.response.status) {
            case 401:
              throw new RpcException(
                new UnauthorizedException(
                  `Invalid authentication for '${query.username}'`,
                ),
              );

            default:
              throw new RpcException(err);
          }
        }),
        map((res) => res.data),
      );
  }

  public requestSt(query: SsoServiceTokenQueryDto): Observable<string> {
    const url = this.casUrlConfig.requestSt.replace(
      /\{tgt\}/g,
      query.authToken,
    );
    const params = new URLSearchParams();
    params.append('service', query.service);
    return this.httpService
      .post<string>(url, params, { headers: CAS_HEADERS })
      .pipe(
        catchError((err) => {
          throw new RpcException(err);
        }),
        map((res) => res.data),
      );
  }

  public logout(tgt: string): Observable<boolean> {
    const url = this.casUrlConfig.logout.replace(/\{tgt\}/g, tgt);
    return this.httpService.delete<string>(url, { headers: CAS_HEADERS }).pipe(
      catchError((err) => {
        throw new RpcException(err);
      }),
      map((res) => res.status === 200),
    );
  }
}
