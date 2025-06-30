/*
 * Copyright ou © ou Copr. Université de Lorraine, (2022)
 *
 * Direction du Numérique de l'Université de Lorraine - SIED
 * (dn-mobile-dev@univ-lorraine.fr)
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

import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { HttpService } from '@nestjs/axios';
import { firstValueFrom } from 'rxjs';
import { CmsConfigError, CmsQueryError } from '../cms.exception';

@Injectable()
export class WordpressService {
  private readonly logger = new Logger(WordpressService.name);
  private readonly apiUrl: string;
  private readonly apiUsername: string;
  private readonly apiPassword: string;
  private readonly timeout: number;

  constructor(
    private readonly configService: ConfigService,
    private readonly httpService: HttpService,
  ) {
    const cmsConfig = this.configService.get('cms');
    if (!cmsConfig) {
      throw new CmsConfigError('Missing required WordPress configuration');
    }

    this.apiUrl = `${cmsConfig.baseUrl}/graphql`;
    this.apiUsername = cmsConfig.apiUsername;
    this.apiPassword = cmsConfig.apiPassword;
    this.timeout = cmsConfig.timeout || 5000;

    this.logger.log('WordPress service initialized successfully');
  }

  async executeGraphQLQuery(query: string): Promise<any> {
    this.logger.debug(`Executing GraphQL query`);

    try {
      const credentials = Buffer.from(
        `${this.apiUsername}:${this.apiPassword}`,
      ).toString('base64');

      const response = await firstValueFrom(
        this.httpService.post(
          this.apiUrl,
          { query },
          {
            headers: { Authorization: `Basic ${credentials}` },
            timeout: this.timeout,
          },
        ),
      );

      // Check GraphQL response for errors
      if (response.data.errors && response.data.errors.length > 0) {
        const graphqlError = response.data.errors[0];
        throw new CmsQueryError(
          `GraphQL Error: ${graphqlError.message}`,
          graphqlError,
        );
      }

      // Vérifier si les données sont présentes
      if (!response.data.data) {
        const noDataError = new Error('No data field in GraphQL response');
        (noDataError as any).response = response.data;
        (noDataError as any).query = query;

        throw new CmsQueryError(
          'No data returned from GraphQL query',
          noDataError,
        );
      }

      this.logger.debug('Query executed successfully');
      return response.data.data;
    } catch (error) {
      // Gérer les erreurs HTTP (401, 403, etc.)
      if (error.response) {
        const statusCode = error.response.status;
        const statusText = error.response.statusText;

        if (statusCode === 401) {
          throw new CmsQueryError(
            'Authentication failed: Invalid credentials (HTTP 401)',
            error,
          );
        } else if (statusCode === 403) {
          throw new CmsQueryError(
            'Access forbidden: Insufficient permissions (HTTP 403)',
            error,
          );
        } else {
          throw new CmsQueryError(
            `HTTP Error ${statusCode}: ${statusText}`,
            error,
          );
        }
      }

      // Si c'est déjà une CmsQueryError, la relancer
      if (error instanceof CmsQueryError) {
        throw error;
      }

      // Autres erreurs (réseau, timeout, etc.)
      throw new CmsQueryError('Failed to fetch data from WordPress', error);
    }
  }
}
