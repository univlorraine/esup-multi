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
import { ConfigService } from '@nestjs/config';
import { Observable, catchError, map } from 'rxjs';
import { Marker } from './marker.dto';
import { Category } from './category.dto';
import { Campus } from './campus.dto';
import { ProviderOptions } from '../config/configuration.interface';
import { HttpService } from '@nestjs/axios';
import { RpcException } from '@nestjs/microservices';

@Injectable()
export class MapService {
  private readonly logger = new Logger(MapService.name);
  private readonly providerOptions: ProviderOptions;

  constructor(
    private readonly configService: ConfigService,
    private readonly httpService: HttpService,
  ) {
    this.providerOptions =
      this.configService.get<ProviderOptions>('providerOptions');
  }

  getMarkers(): Observable<Marker[]> {
    return this.httpService
      .get<any>(`${this.providerOptions.url}/pois`, this.httpOptions)
      .pipe(
        catchError(this.handleError("Unable to get map's POI")),
        map((res) => {
          const geoJsonData = res.data;
          const markersList: Marker[] = [];
          for (const category in geoJsonData) {
            const markers: Marker[] = geoJsonData[category].features.map(
              (feature) => {
                Object.entries(feature.properties).forEach(
                  ([property, value]: [string, any]) => {
                    if (property === 'Nom') {
                      return;
                    }

                    if (
                      typeof value == 'string' &&
                      (value.startsWith('https://') ||
                        value.startsWith('http://'))
                    ) {
                      value = `<a href="${value}" target="_blank">${value}</a>`;
                    }

                    if (property === 'Description') {
                      value.forEach((d) => {
                        if (d.value) d.value += '<br />';
                      });
                    }
                  },
                );

                return {
                  category,
                  title: feature.properties.Nom,
                  description: feature.properties.Description,
                  latitude: feature.geometry.coordinates[1],
                  longitude: feature.geometry.coordinates[0],
                  icon: feature.properties.icon,
                };
              },
            );

            markersList.push(...markers);
          }

          return markersList;
        }),
      );
  }

  getCategories(): Observable<Category[]> {
    return this.httpService
      .get<any>(`${this.providerOptions.url}/categories`, this.httpOptions)
      .pipe(
        catchError(this.handleError('Unable to get map categories')),
        map((res) => res.data),
      );
  }

  getCampuses(): Observable<Campus[]> {
    return this.httpService
      .get<any>(`${this.providerOptions.url}/campuses`, this.httpOptions)
      .pipe(
        catchError(this.handleError('Unable to get map campuses')),
        map((res) => res.data),
      );
  }

  private handleError(message: string) {
    return (err: any) => {
      this.logger.error(message, err);
      throw new RpcException(message);
    };
  }

  private get httpOptions() {
    return {
      headers: { Authorization: `Bearer ${this.providerOptions.bearerToken}` },
    };
  }
}
