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
import { AxiosError } from 'axios';
import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { RpcException } from '@nestjs/microservices';
import { catchError, map, Observable } from 'rxjs';
import { ClockingProviderApi } from '../config/configuration.interface';
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
  private clockingProviderApiConfig: ClockingProviderApi;

  constructor(
    private readonly configService: ConfigService,
    private readonly httpService: HttpService,
  ) {
    this.clockingProviderApiConfig =
      this.configService.get<ClockingProviderApi>('clockingProviderApi');
  }

  private externalApiClocking(
    query: ClockingQueryDto,
    top: boolean,
  ): Observable<ClockingReplyDto> {
    const url = this.clockingProviderApiConfig.apiUrl;

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
          Authorization: `Bearer ${this.clockingProviderApiConfig.bearerToken}`,
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
