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
import { Features } from '@common/models/features.model';
import { FeaturesDirectus } from '@directus/collections/features/features.directus.model';
import { DirectusService } from '@directus/directus.service';
import { OnEvent } from '@nestjs/event-emitter';
import { ValidateMapping } from '@common/decorators/validate-mapping.decorator';
import { FeaturesSchema } from '@common/validation/schemas/features.schema';
import {
  normalizeEmptyArrayToNull,
  normalizeEmptyStringToNull,
} from '@common/utils/normalize';
import { CacheService } from '@cache/cache.service';
import { CacheCollection } from '@cache/cache.config';

@Injectable()
export class FeaturesDirectusService {
  private readonly logger = new Logger(FeaturesDirectusService.name);
  constructor(
    private readonly directusService: DirectusService,
    private readonly cacheService: CacheService,
  ) {}

  @OnEvent('directus.features.cache.cleared')
  async handleCacheCleared() {
    this.logger.log('Received cache cleared event - preloading data...');
    try {
      await this.preloadData();
    } catch (error) {
      this.logger.error(
        'Failed to preload features after cache clear:',
        error.message,
      );
    }
  }

  public async preloadData() {
    this.logger.log('Preloading features...');
    await this.getFeatures();
    this.logger.log('Features preloaded successfully');
  }

  @ValidateMapping({ schema: FeaturesSchema })
  private mapToMultiModel(feature: FeaturesDirectus): Features {
    return {
      id: feature.id.toString(),
      authorization: feature.authorization
        ? {
            type: feature.authorization.type,
            roles: feature.authorization.roles,
          }
        : null,
      description: normalizeEmptyStringToNull(feature.description),
      icon: normalizeEmptyStringToNull(feature.icon),
      iconSvgDark: normalizeEmptyStringToNull(feature.iconSourceSvgDarkTheme),
      iconSvgLight: normalizeEmptyStringToNull(feature.iconSourceSvgLightTheme),
      link: normalizeEmptyStringToNull(feature.link),
      menu: feature.menu,
      position: feature.position || 0,
      routerLink: normalizeEmptyStringToNull(feature.routerLink),
      ssoService: normalizeEmptyStringToNull(feature.ssoService),
      statisticName: normalizeEmptyStringToNull(feature.statisticName),
      type: feature.type,
      translations: feature.translations.map((translation) => ({
        languagesCode: translation.languages_code.code,
        searchKeywords: normalizeEmptyArrayToNull(translation.searchKeywords),
        shortTitle: normalizeEmptyStringToNull(translation.shortTitle),
        title: normalizeEmptyStringToNull(translation.title),
      })),
      settingsByRole:
        feature.settings_by_role?.map((settings) => ({
          role: settings.settings_by_role_id.role,
          position: settings.settings_by_role_id.position || 0,
        })) ?? [],
    };
  }

  async getFeatures(): Promise<Features[]> {
    return this.cacheService.getOrFetchWithLock(CacheCollection.FEATURES, () =>
      this.loadFeaturesFromDirectus(),
    );
  }

  private async loadFeaturesFromDirectus(): Promise<Features[]> {
    this.logger.debug('Loading features from Directus...');
    const data = await this.directusService.executeGraphQLQuery(`
      query {
        features(filter: { status: { _eq: "published" }}) {
          id
          description
          icon
          iconSourceSvgDarkTheme
          iconSourceSvgLightTheme
          link
          menu
          position
          routerLink
          ssoService
          statisticName
          status
          type
          translations {
            id
            languages_code {
              code
              name
              direction
            }
            searchKeywords
            shortTitle
            title
          }
          authorization {
            id
            roles
            type
          }
          settings_by_role {
            id
            sort
            settings_by_role_id {
              id
              position
              role
            }
          }
        }
      }
    `);
    return data.features.map(this.mapToMultiModel);
  }

  async getFeature(id: number): Promise<Features> {
    return this.cacheService.getOrFetchWithLock(
      CacheCollection.FEATURES,
      () => this.loadFeatureFromDirectus(id),
      id,
    );
  }

  private async loadFeatureFromDirectus(id: number): Promise<Features> {
    this.logger.debug(`Loading feature ${id} from Directus...`);
    const data = await this.directusService.executeGraphQLQuery(`
      query {
        features(filter: {id: { _eq: ${id} }}) {
          id
          description
          icon
          iconSourceSvgDarkTheme
          iconSourceSvgLightTheme
          link
          menu
          position
          routerLink
          ssoService
          statisticName
          status
          type
          translations {
            id
            languages_code {
              code
              name
              direction
            }
            searchKeywords
            shortTitle
            title
          }
          authorization {
            id
            roles
            type
          }
          settings_by_role {
            id
            sort
            settings_by_role_id {
              id
              position
              role
            }
          }
        }
      }
    `);
    return this.mapToMultiModel(data.features[0]);
  }
}
