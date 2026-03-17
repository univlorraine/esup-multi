import { Injectable, Logger } from '@nestjs/common';
import { CacheService } from '@cache/cache.service';
import { WordpressService } from '@wordpress/wordpress.service';
import { OnEvent } from '@nestjs/event-emitter';
import { ValidateMapping } from '@common/decorators/validate-mapping.decorator';
import { CacheCollection } from '@cache/cache.config';
import { MapPointWordpress } from '@wordpress/collections/map-points/map-points.wordpress.model';
import {
  MapDataSchema,
  MapPointSchema,
} from '@common/validation/schemas/map-points.schema';
import {
  MapPointData,
  MapData,
  MapFeatureCollection,
} from '@common/models/map-points.model';
import {
  MapCategoryTranslations,
  MapPointTranslations,
} from '@common/models/translations.model';
import {
  MapCategoryTranslationsWordpress,
  MapPointTranslationsWordpress,
} from '@wordpress/collections/translations/translations.wordpress.model';
import { normalizeEmptyStringToNull } from '@common/utils/normalize';
import { Campus } from '@common/models/campuses.model';
import { MapCategory } from '@common/models/map-categories.model';
import { MapIcon } from '@common/models/map-icons.model';

// TODO: Move FRENCH_CODE to .env and rename it to DEFAULT_LANGUAGE_CODE
const FRENCH_CODE = 'FR';

@Injectable()
export class MapPointsWordpressService {
  private readonly logger = new Logger(MapPointsWordpressService.name);
  constructor(
    private readonly wordpressService: WordpressService,
    private readonly cacheService: CacheService,
  ) {}

  @OnEvent('wordpress.map-points.cache.cleared')
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
  private mapToMultiModel(mapPoint: MapPointWordpress): MapPointData {
    const frTranslation: MapPointTranslations = {
      languagesCode: FRENCH_CODE.toLowerCase(),
      name: mapPoint.mapPointName,
      description: mapPoint.mapPointDescription,
    };

    const translations: MapPointTranslations[] = [
      frTranslation,
      ...(mapPoint.translations?.map(
        (translation: MapPointTranslationsWordpress) => ({
          languagesCode: translation.language.code.toLowerCase(),
          name: translation.mapPointName,
          description: normalizeEmptyStringToNull(
            translation.mapPointDescription,
          ),
        }),
      ) || []),
    ];

    const campusNode = mapPoint.mapPointCampus?.node;
    let campus: Campus | null = null;
    if (campusNode) {
      campus = {
        id: campusNode.databaseId.toString(),
        name: campusNode.campusName,
        photo: normalizeEmptyStringToNull(
          campusNode.campusPhoto?.node?.mediaItemUrl.toString(),
        ),
        initial: {
          lat: campusNode.campusInitLatitude,
          lng: campusNode.campusInitLongitude,
        },
        southwest: {
          lat: campusNode.campusSwLatitude,
          lng: campusNode.campusSwLongitude,
        },
        northeast: {
          lat: campusNode.campusNeLatitude,
          lng: campusNode.campusNeLongitude,
        },
      };
    }

    let mapCategoryNode = mapPoint.mapPointCategory?.node;
    if (!mapCategoryNode) {
      mapCategoryNode = {
        mapCategoryInternalName: '__uncategorized__',
        language: {
          code: FRENCH_CODE,
          locale: 'fr_FR',
          name: 'French',
        },
        mapCategoryName: 'Non catégorisé',
        translations: [],
      };
    }
    const categoryDefaultTranslation: MapCategoryTranslations = {
      languagesCode: mapCategoryNode.language.code.toLowerCase(),
      label: mapCategoryNode.mapCategoryName,
    };
    const categoryTranslations: MapCategoryTranslations[] = [
      categoryDefaultTranslation,
      ...(mapCategoryNode.translations?.map(
        (translation: MapCategoryTranslationsWordpress) => ({
          languagesCode: translation.language.code.toLowerCase(),
          label: translation.mapCategoryName,
        }),
      ) || []),
    ];
    const category = {
      id: mapCategoryNode.mapCategoryInternalName,
      translations: categoryTranslations,
    };

    const mapIconNode = mapPoint.mapPointIcon?.node;
    let icon: MapIcon | null = null;
    if (mapIconNode) {
      icon = {
        id: mapIconNode.databaseId.toString(),
        svg: mapIconNode.mapIconSvg,
        width: mapIconNode.mapIconWidth,
        height: mapIconNode.mapIconHeight,
        x: mapIconNode.mapIconPosX,
        y: mapIconNode.mapIconPosY,
      };
    }

    return {
      feature: {
        id: mapPoint.databaseId.toString(),
        campusId: campus ? campus.id : null,
        iconId: icon ? icon.id : null,
        location: {
          lat: mapPoint.mapPointLatitude,
          lng: mapPoint.mapPointLongitude,
        },
        translations,
      },
      campus,
      category,
      icon,
    };
  }

  @ValidateMapping({ schema: MapDataSchema })
  private mapToMultiModelData(nodes: MapPointWordpress[]): MapData {
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
      () => this.loadMapDataFromWordpress(),
    );
  }

  private async loadMapDataFromWordpress(): Promise<MapData> {
    this.logger.debug('Loading map points from WordPress...');
    const data = await this.wordpressService.executeGraphQLQuery(`
      query {
        mapPoints(first: 100, where: {language: ${FRENCH_CODE}}) {
          nodes {
            databaseId
            mapPointName
            mapPointDescription
            mapPointLatitude
            mapPointLongitude
            mapPointCampus {
              node {
                databaseId
                campusName
                campusPhoto {
                  node {
                    databaseId
                    sourceUrl
                    mediaItemUrl
                    altText
                  }
                }
                campusInitLatitude
                campusInitLongitude
                campusSwLatitude
                campusSwLongitude
                campusNeLatitude
                campusNeLongitude
              }
            }
            mapPointCategory {
              node {
                databaseId
                mapCategoryInternalName
                language {
                  code
                  locale
                  name
                }
                mapCategoryName
                translations {
                  databaseId
                  language {
                    code
                    locale
                    name
                  }
                	mapCategoryName
                }
              }
            }
            mapPointIcon {
              node {
                databaseId
                mapIconName
                mapIconSvg
                mapIconWidth
                mapIconHeight
                mapIconPosX
                mapIconPosY
              }
            }
            translations {
              databaseId
              language {
                code
                locale
                name
              }
              mapPointName
              mapPointDescription
            }
          }
        }
      }
    `);
    return this.mapToMultiModelData(data.mapPoints.nodes);
  }

  async getMapPointData(id: number): Promise<MapPointData> {
    return this.cacheService.getOrFetchWithLock(
      CacheCollection.MAP_POINTS,
      () => this.loadMapPointFromWordpress(id),
      id,
    );
  }

  private async loadMapPointFromWordpress(id: number): Promise<MapPointData> {
    this.logger.debug(`Loading map point ${id} from WordPress...`);
    const data = await this.wordpressService.executeGraphQLQuery(`
      query {
        mapPoint(id: ${id}, idType: DATABASE_ID) {
          databaseId
          mapPointName
          mapPointDescription
          mapPointLatitude
          mapPointLongitude
          mapPointCategory {
            node {
              databaseId
              mapCategoryInternalName
              language {
                code
                locale
                name
              }
              mapCategoryName
              translations {
                databaseId
                language {
                  code
                  locale
                  name
                }
                mapCategoryName
              }
            }
          }
          mapPointCampus {
            node {
              databaseId
              campusName
              campusPhoto {
                node {
                  databaseId
                  sourceUrl
                  mediaItemUrl
                  altText
                }
              }
              campusInitLatitude
              campusInitLongitude
              campusSwLatitude
              campusSwLongitude
              campusNeLatitude
              campusNeLongitude
            }
          }
          mapPointIcon {
            node {
              databaseId
              mapIconName
              mapIconSvg
              mapIconWidth
              mapIconHeight
              mapIconPosX
              mapIconPosY
            }
          }
          translations {
            databaseId
            language {
              code
              locale
              name
            }
            mapPointName
            mapPointDescription
          }
        }
      }
    `);
    return this.mapToMultiModel(data.mapPoint);
  }
}
