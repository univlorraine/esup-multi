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

import { Injectable, Logger } from '@nestjs/common';
import { catchError, map, Observable } from 'rxjs';
import { FeaturesPositionHelper } from './features-position.helper';
import {
  Feature,
  GraphQLResponse,
  Widget,
  AppElement,
  ContentQueryResponse,
} from './features.dto';
import { CmsApi } from '../config/configuration.interface';
import { ConfigService } from '@nestjs/config';
import { HttpService } from '@nestjs/axios';
import { RpcException } from '@nestjs/microservices';

@Injectable()
export class FeaturesService {
  private readonly logger = new Logger(FeaturesService.name);
  private cmsApiConfig: CmsApi;
  constructor(
    private readonly configService: ConfigService,
    private readonly httpService: HttpService,
  ) {
    this.cmsApiConfig = this.configService.get<CmsApi>('cmsApi');
  }

  public getFeaturesAndWidgets(userRoles: string[]): Observable<AppElement[]> {
    const url = `${this.cmsApiConfig.apiUrl}/graphql`;

    // Construction de la requête GraphQL pour les features et widgets
    const graphqlQuery = {
      query: `
        query {
          features {
            id
            icon
            iconSvgLight
            iconSvgDark
            link
            menu
            position
            routerLink
            ssoService
            statisticName
            type
            translations {
              languagesCode
              searchKeywords
              shortTitle
              title
            }
            authorization {
              type
              roles
            }
            settingsByRole {
              position
              role
            }
          }
          widgets {
            id
            widget
            icon
            iconSvgLight
            iconSvgDark
            link
            color
            position
            routerLink
            ssoService
            statisticName
            type
            translations {
              languagesCode
              content
              title
            }
            authorization {
              type
              roles
            }
            settingsByRole {
              position
              role
            }
          }
        }
      `,
    };

    const requestConfig = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${this.cmsApiConfig.bearerToken}`,
      },
    };

    const featuresPositionHelper = new FeaturesPositionHelper(userRoles);

    return this.httpService
      .post<GraphQLResponse<ContentQueryResponse>>(
        url,
        graphqlQuery,
        requestConfig,
      )
      .pipe(
        catchError((err: any) => {
          const errorMessage = 'Unable to get features and widgets from CMS';
          this.logger.error(errorMessage, err);
          throw new RpcException(errorMessage);
        }),
        map((response) => {
          const features = (response.data.data.features || []).map(
            (f) => ({ ...f, id: `feature:${f.id}` } as Feature),
          );
          const widgets = (response.data.data.widgets || []).map(
            (w) => ({ ...w, id: `widget:${w.id}` } as Widget),
          );

          const allElements: AppElement[] = [...features, ...widgets];

          return featuresPositionHelper.sortElements(allElements);
        }),
      );
  }
}
