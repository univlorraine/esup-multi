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
import { catchError, map, Observable, zip } from 'rxjs';
import { FeaturesPositionHelper } from './features-position.helper';
import { DirectusFeature, Feature } from './features.dto';
import { DirectusApi } from '../config/configuration.interface';
import { ConfigService } from '@nestjs/config';
import { HttpService } from '@nestjs/axios';
import { RpcException } from '@nestjs/microservices';

interface DirectusResponse<T> {
  data: T;
}

@Injectable()
export class FeaturesService {
  private readonly logger = new Logger(FeaturesService.name);
  private directusApiConfig: DirectusApi;
  constructor(
    private readonly configService: ConfigService,
    private readonly httpService: HttpService,
  ) {
    this.directusApiConfig = this.configService.get<DirectusApi>('directusApi');
  }

  public getFeatures(userRoles: string[]): Observable<Feature[]> {
    const urlFeatures = `${this.directusApiConfig.apiUrl}/items/features`;
    const urlWidgets = `${this.directusApiConfig.apiUrl}/items/widgets`;
    const requestConfig = {
      params: {
        'filter[status][_eq]': 'published',
        fields:
          '*,translations.*,authorization.*,settings_by_role.settings_by_role_id.*',
      },
      headers: {
        Accept: 'application/json',
        Authorization: `Bearer ${this.directusApiConfig.bearerToken}`,
      },
    };

    const featuresPositionHelper = new FeaturesPositionHelper(userRoles);
    const sortFeatures = (a: Feature, b: Feature) => {
      const positionA = featuresPositionHelper.getFeaturePosition(a);
      const positionB = featuresPositionHelper.getFeaturePosition(b);
      return positionA - positionB;
    };

    const directusFeaturesToFeatures = (feature: DirectusFeature): Feature => {
      return {
        ...feature,
        settings_by_role: feature.settings_by_role.map(
          (sbr) => sbr.settings_by_role_id,
        ),
      };
    };

    return zip(
      this.httpService.get<DirectusResponse<DirectusFeature[]>>(
        urlFeatures,
        requestConfig,
      ),
      this.httpService.get<DirectusResponse<DirectusFeature[]>>(
        urlWidgets,
        requestConfig,
      ),
    ).pipe(
      catchError((err: any) => {
        const errorMessage = 'Unable to get directus features';
        this.logger.error(errorMessage, err);
        throw new RpcException(errorMessage);
      }),
      map((res) =>
        Array.prototype.concat(
          res[0].data.data.map((f) => ({ ...f, id: `feature:${f.id}` })),
          res[1].data.data.map((w) => ({ ...w, id: `widget:${w.id}` })),
        ),
      ),
      map((features: DirectusFeature[]): Feature[] =>
        features.map(directusFeaturesToFeatures),
      ),
      map((features: Feature[]) => features.sort(sortFeatures)),
    );
  }
}
