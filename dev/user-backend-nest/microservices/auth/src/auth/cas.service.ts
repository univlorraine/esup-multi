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
import { Injectable, Logger, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { RpcException } from '@nestjs/microservices';
import { Observable, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { CasUrl } from '../config/configuration.interface';
import {
  AuthenticateQueryDto,
  LogoutQueryDto,
  SsoServiceTokenQueryDto,
} from './auth.dto';

const CAS_HEADERS = {
  Accept: 'application/json',
  'Content-Type': 'application/x-www-form-urlencoded',
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

  private formatCasHeaderWithIp(ip: string) {
    return {
      ...CAS_HEADERS,
      'X-Forwarded-For': ip,
    };
  }

  public isTgtValid(tgt: string): Observable<boolean> {
    const url = this.casUrlConfig.validateTgt.replace(/\{tgt\}/g, tgt);
    return this.httpService.get<any>(url).pipe(
      map(() => true),
      catchError((err) => {
        switch (err.response.status) {
          case 404:
            return of(false);

          default:
            throw new RpcException(err);
        }
      }),
    );
  }

  public requestTgt(query: AuthenticateQueryDto): Observable<string> {
    const params = new URLSearchParams();
    params.append('username', query.username);
    params.append('password', query.password);
    return this.httpService
      .post<string>(this.casUrlConfig.requestTgt, params, {
        headers: this.formatCasHeaderWithIp(query.ip),
      })
      .pipe(
        catchError((err) => {
          if (err.response) {
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
          } else {
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
      .post<string>(url, params, {
        headers: this.formatCasHeaderWithIp(query.ip),
      })
      .pipe(
        map((res) => res.data),
        catchError((err) => {
          switch (err.response.status) {
            case 404:
              throw new RpcException(
                new UnauthorizedException(`Invalid or expired authentication'`),
              );

            default:
              throw new RpcException(err);
          }
        }),
      );
  }

  public logout(query: LogoutQueryDto): Observable<boolean> {
    const url = this.casUrlConfig.logout.replace(/\{tgt\}/g, query.authToken);
    return this.httpService
      .delete<string>(url, { headers: this.formatCasHeaderWithIp(query.ip) })
      .pipe(
        catchError((err) => {
          throw new RpcException(err);
        }),
        map((res) => res.status === 200),
      );
  }
}
