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
import { catchError, forkJoin, map, Observable, of } from 'rxjs';
import {
  AdditionalProviderApi,
  CmsApi,
} from '../config/configuration.interface';
import { HttpService } from '@nestjs/axios';
import { RpcException } from '@nestjs/microservices';
import {
  MapDataAdditionalProviderDto,
  MapDataGraphQLDto,
  MapDataGraphQLResponse,
  MapDataJsonDto,
  MapIconDto,
  Marker,
} from './map.dto';

@Injectable()
export class MapService {
  private readonly logger = new Logger(MapService.name);
  private cmsApiConfig: CmsApi;
  private additionalProviderApiConfig: AdditionalProviderApi;

  constructor(
    private readonly configService: ConfigService,
    private readonly httpService: HttpService,
  ) {
    this.cmsApiConfig = this.configService.get<CmsApi>('cmsApi');
    this.additionalProviderApiConfig =
      this.configService.get<AdditionalProviderApi>('additionalProvider');
  }

  public getMapData(): Observable<MapDataJsonDto> {
    return forkJoin({
      cms: this.fetchFromCms(),
      additionalProvider: this.fetchFromAdditionalProvider(),
    }).pipe(
      map(({ cms, additionalProvider }) => {
        const icons: MapIconDto[] = [...cms.icons, ...additionalProvider.icons];

        const categories = [...cms.categories];
        additionalProvider.categories.forEach((category) => {
          if (
            !categories.find(
              (existingCategory) => existingCategory.id === category.id,
            )
          ) {
            categories.push(category);
          }
        });

        const campuses = [...cms.campuses];
        additionalProvider.campuses.forEach((campus) => {
          if (
            !campuses.find(
              (existingCampus) => existingCampus.name === campus.name,
            )
          ) {
            campuses.push({
              ...campus,
              id: `${campus.id}_additional`, // Ensure unique ID
            });
          }
        });

        const markersCollections: Record<string, Marker[]> = {
          ...cms.markersCollections,
        };
        Object.keys(additionalProvider.markersCollections).forEach(
          (categoryId) => {
            if (!markersCollections[categoryId]) {
              // categoryId does not exist in cms data, add the whole collection
              markersCollections[categoryId] =
                additionalProvider.markersCollections[categoryId].map(
                  (marker) => ({
                    ...marker,
                    campusId:
                      campuses.find((campus) => marker.campusId === campus.name)
                        ?.id || '',
                  }),
                );
            } else {
              // categoryId exists, append markers to existing collection
              const markers = additionalProvider.markersCollections[
                categoryId
              ].map((marker) => ({
                ...marker,
                id: `${marker.id}_additional`, // Ensure unique ID
                campusId:
                  campuses.find((campus) => marker.campusId === campus.name)
                    ?.id || '',
              }));
              markersCollections[categoryId].push(...markers);
            }
          },
        );

        return {
          icons,
          categories,
          campuses,
          markersCollections,
        };
      }),
    );
  }

  private fetchFromCms(): Observable<MapDataJsonDto> {
    const url = `${this.cmsApiConfig.apiUrl}/graphql`;

    const graphqlQuery = {
      query: `
        query {
          mapData {
            icons {
              id
              svg
              width
              height
              x
              y
            }
            categories {
              id
              translations {
                languagesCode
                label
              }
            }
            campuses {
              id
              name
              photo
              initial {
                lat
                lng
              }
              southwest {
                lat
                lng
              }
              northeast {
                lat
                lng
              }
            }
            featureCollections {
              categoryId
              features {
                id
                campusId
                iconId
                location {
                  lat
                  lng
                }
                translations {
                  languagesCode
                  name
                  description
                }
              }
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

    return this.httpService
      .post<MapDataGraphQLResponse>(url, graphqlQuery, requestConfig)
      .pipe(
        catchError((err: any) => {
          const errorMessage = 'Unable to get map points data from CMS';
          this.logger.error(errorMessage, err);
          throw new RpcException(errorMessage);
        }),
        map((res) => {
          // Vérification des erreurs dans la réponse GraphQL
          if (res.data.errors && res.data.errors.length > 0) {
            const errorMessage = `GraphQL error: ${res.data.errors[0].message}`;
            this.logger.error(errorMessage);
            throw new RpcException(errorMessage);
          }

          const graphQLData: MapDataGraphQLDto = res.data.data.mapData;
          const markersCollections: Record<string, Marker[]> = {};
          graphQLData.featureCollections.forEach((collection) => {
            markersCollections[collection.categoryId] = collection.features.map(
              (feature) => {
                return {
                  id: feature.id,
                  latitude: feature.location.lat,
                  longitude: feature.location.lng,
                  campusId: feature.campusId,
                  iconId: feature.iconId,
                  translations: feature.translations,
                };
              },
            );
          });

          const jsonData: MapDataJsonDto = {
            icons: graphQLData.icons,
            categories: graphQLData.categories,
            campuses: graphQLData.campuses,
            markersCollections,
          };

          return jsonData;
        }),
      );
  }

  private fetchFromAdditionalProvider(): Observable<MapDataJsonDto> {
    const url = this.additionalProviderApiConfig.apiUrl;

    if (!url) {
      return of({
        icons: [],
        categories: [],
        campuses: [],
        markersCollections: {},
      });
    }

    const requestConfig = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${this.additionalProviderApiConfig.bearerToken}`,
      },
    };

    return this.httpService
      .get<MapDataAdditionalProviderDto>(url, requestConfig)
      .pipe(
        catchError((err: any) => {
          const errorMessage =
            'Unable to get map points data from Additional Provider';
          this.logger.error(errorMessage, err);
          throw new RpcException(errorMessage);
        }),
        map((res) => {
          const data = res.data;

          const campuses = data.campuses;
          const categories = data.categories.map((category) => ({
            id: category.id,
            translations: category.label.map((label) => ({
              languagesCode: label.langcode,
              label: label.value,
            })),
          }));

          const icons = [];
          const markersCollections: Record<string, Marker[]> = {};
          Object.keys(data.pois).forEach((categoryId) => {
            data.pois[categoryId].features.forEach((poi) => {
              const poiId = crypto.randomUUID();

              const iconId = `icon_${poiId}`;
              icons.push({
                ...poi.properties.icon,
                id: iconId,
              });

              if (!markersCollections[categoryId]) {
                markersCollections[categoryId] = [];
              }
              markersCollections[categoryId].push({
                id: poiId,
                latitude: poi.geometry.coordinates[1],
                longitude: poi.geometry.coordinates[0],
                campusId: poi.properties.site,
                iconId: iconId,
                translations: poi.properties.name.map((name, index) => ({
                  languagesCode: name.langcode,
                  name: name.value,
                  description: poi.properties.description[index]
                    ? poi.properties.description[index].value
                    : '',
                })),
              });
            });
          });

          return {
            icons,
            categories,
            campuses,
            markersCollections,
          };
        }),
      );
  }
}
