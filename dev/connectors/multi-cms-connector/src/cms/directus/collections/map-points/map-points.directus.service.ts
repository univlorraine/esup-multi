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
import { DirectusService } from '@directus/directus.service';
import { OnEvent } from '@nestjs/event-emitter';
import { ValidateMapping } from '@common/decorators/validate-mapping.decorator';
import { normalizeEmptyStringToNull } from '@common/utils/normalize';
import { CacheService } from '@cache/cache.service';
import { CacheCollection } from '@cache/cache.config';
import {
  MapData,
  MapFeatureCollection,
  MapPointData,
} from '@common/models/map-points.model';
import {
  MapDataSchema,
  MapPointSchema,
} from '@common/validation/schemas/map-points.schema';
import { Campus } from '@common/models/campuses.model';
import { MapCategory } from '@common/models/map-categories.model';
import { MapIcon } from '@common/models/map-icons.model';
import { MapPointDirectus } from '@directus/collections/map-points/map-points.directus.model';

@Injectable()
export class MapPointsDirectusService {
  private readonly logger = new Logger(MapPointsDirectusService.name);
  constructor(
    private readonly directusService: DirectusService,
    private readonly cacheService: CacheService,
  ) {}

  @OnEvent('directus.map-points.cache.cleared')
  async handleCacheCleared() {
    this.logger.log('Received cache cleared event - preloading data...');
    try {
      await this.preloadData();
    } catch (error) {
      this.logger.error(
        'Failed to preload map points after cache clear:',
        error.message,
      );
    }
  }

  public async preloadData() {
    this.logger.log('Preloading map points...');
    await this.getMapData();
    this.logger.log('Map points preloaded successfully');
  }

  @ValidateMapping({ schema: MapPointSchema })
  private mapToMultiModel(mapPoint: MapPointDirectus): MapPointData {
    return {
      feature: {
        id: mapPoint.id.toString(),
        campusId: mapPoint.campus ? mapPoint.campus.id.toString() : null,
        iconId: mapPoint.icon ? mapPoint.icon.id.toString() : null,
        location: {
          lat: mapPoint.lat,
          lng: mapPoint.lng,
        },
        translations: mapPoint.translations.map((translation) => ({
          languagesCode: translation.languages_code.code,
          name: translation.name,
          description: normalizeEmptyStringToNull(translation.description),
        })),
      },
      campus: mapPoint.campus
        ? {
            id: mapPoint.campus.id.toString(),
            name: mapPoint.campus.name,
            initial: {
              lat: mapPoint.campus.initial_lat,
              lng: mapPoint.campus.initial_lng,
            },
            southwest: {
              lat: mapPoint.campus.southwest_lat,
              lng: mapPoint.campus.southwest_lng,
            },
            northeast: {
              lat: mapPoint.campus.northeast_lat,
              lng: mapPoint.campus.northeast_lng,
            },
            photo: mapPoint.campus.photo
              ? this.directusService.buildAssetUrl(
                  mapPoint.campus.photo.id.toString(),
                )
              : null,
          }
        : null,
      category: mapPoint.category
        ? {
            id: mapPoint.category.id.toString(),
            translations: mapPoint.category.translations.map((translation) => ({
              languagesCode: translation.languages_code.code,
              label: normalizeEmptyStringToNull(translation.label),
            })),
          }
        : null,
      icon: mapPoint.icon
        ? {
            id: mapPoint.icon.id.toString(),
            svg: mapPoint.icon.svg,
            width: mapPoint.icon.width,
            height: mapPoint.icon.height,
            x: mapPoint.icon.x,
            y: mapPoint.icon.y,
          }
        : null,
    };
  }

  @ValidateMapping({ schema: MapDataSchema })
  private mapToMultiModelData(nodes: MapPointDirectus[]): MapData {
    const data: MapPointData[] = nodes.map(this.mapToMultiModel);

    const campuses: Campus[] = [];
    const categories: MapCategory[] = [];
    const icons: MapIcon[] = [];
    const featureCollections: MapFeatureCollection[] = [];

    for (const mapPointData of data) {
      if (mapPointData.campus && !campuses[mapPointData.campus.id]) {
        campuses[mapPointData.campus.id] = mapPointData.campus;
      }

      if (mapPointData.category) {
        if (!categories[mapPointData.category.id]) {
          categories[mapPointData.category.id] = mapPointData.category;
          featureCollections.push({
            categoryId: mapPointData.category.id,
            features: [],
          });
        }
        const featureCollection = featureCollections.find(
          (fc) => fc.categoryId === mapPointData.category.id,
        );
        if (featureCollection) {
          featureCollection.features.push(mapPointData.feature);
        }
      }

      if (mapPointData.icon && !icons[mapPointData.icon.id]) {
        icons[mapPointData.icon.id] = mapPointData.icon;
      }
    }

    return {
      campuses: Object.values(campuses),
      categories: Object.values(categories),
      icons: Object.values(icons),
      featureCollections,
    };
  }

  async getMapData(): Promise<MapData> {
    return this.cacheService.getOrFetchWithLock(
      CacheCollection.MAP_POINTS,
      () => this.loadMapPointsFromDirectus(),
    );
  }

  private async loadMapPointsFromDirectus(): Promise<MapData> {
    this.logger.debug('Loading map points from Directus...');
    const data = await this.directusService.executeGraphQLQuery(`
      query {
        map_points(filter: { status: { _eq: "published" } }) {
          id
          lat
          lng
          category {
            id
            translations {
              id
              label
              languages_code {
                code
                direction
                name
              }
            }
          }
          campus {
            id
            name
            initial_lat
            initial_lng
            southwest_lat
            southwest_lng
            northeast_lat
            northeast_lng
            photo {
              id
            }
          }
          icon {
            id
            svg
            width
            height
            x
            y
          }
          translations {
            id
            name
            description
            languages_code {
              code
              direction
              name
            }
          }
        }
      }
    `);
    return this.mapToMultiModelData(data.map_points);
  }

  async getMapPointData(id: number): Promise<MapPointData> {
    return this.cacheService.getOrFetchWithLock(
      CacheCollection.MAP_POINTS,
      () => this.loadMapPointFromDirectus(id),
      id,
    );
  }

  private async loadMapPointFromDirectus(id: number): Promise<MapPointData> {
    this.logger.debug(`Loading map point ${id} from Directus...`);
    const data = await this.directusService.executeGraphQLQuery(`
      query {
        map_points(filter: {id: { _eq: ${id} }}) {
          id
          lat
          lng
          category {
            id
            translations {
              id
              label
              languages_code {
                code
                direction
                name
              }
            }
          }
          campus {
            id
            name
            initial_lat
            initial_lng
            southwest_lat
            southwest_lng
            northeast_lat
            northeast_lng
            photo {
              id
            }
          }
          icon {
            id
            svg
            width
            height
            x
            y
          }
          translations {
            id
            name
            description
            languages_code {
              code
              direction
              name
            }
          }
        }
      }
    `);
    return this.mapToMultiModel(data.map_points[0]);
  }
}
