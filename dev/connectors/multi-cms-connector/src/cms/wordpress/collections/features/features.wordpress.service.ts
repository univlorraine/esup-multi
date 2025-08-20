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

import { Injectable } from '@nestjs/common';
import { Features } from '@common/models/features.model';
import { WordpressService } from '@wordpress/wordpress.service';
import { FeaturesTranslations } from '@common/models/translations.model';
import { FeaturesTranslationsWordpress } from '@wordpress/collections/translations/translations.wordpress.model';
import { FeaturesWordpress } from '@wordpress/collections/features/features.wordpress.model';
import { SettingsByRole } from '@common/models/settings-by-role.model';
import { ValidateMapping } from '@common/decorators/validate-mapping.decorator';
import { FeaturesSchema } from '@common/validation/schemas/features.schema';
import { normalizeEmptyStringToNull } from '@common/utils/normalize';
import { CacheService } from '@cache/cache.service';
import { CacheCollection } from '@cache/cache.config';

// TODO: Move FRENCH_CODE to .env and rename it to DEFAULT_LANGUAGE_CODE
const FRENCH_CODE = 'FR';

@Injectable()
export class FeaturesWordpressService {
  constructor(
    private readonly wordpressService: WordpressService,
    private readonly cacheService: CacheService,
  ) {}

  @ValidateMapping({ schema: FeaturesSchema })
  private mapToMultiModel(feature: FeaturesWordpress): Features {
    const frTranslation: FeaturesTranslations = {
      languagesCode: FRENCH_CODE.toLowerCase(),
      title: feature.featureTitle,
      shortTitle: normalizeEmptyStringToNull(feature.featureShortTitle),
      searchKeywords:
        feature.featureSearchKeywords &&
        feature.featureSearchKeywords.trim() !== ''
          ? feature.featureSearchKeywords
              .split(',')
              .filter((keyword) => keyword.trim() !== '')
          : null,
    };

    const translations: FeaturesTranslations[] = [
      frTranslation,
      ...(feature.translations?.map(
        (translation: FeaturesTranslationsWordpress) => ({
          languagesCode: translation.language.code.toLowerCase(),
          title: translation.featureTitle,
          shortTitle: normalizeEmptyStringToNull(translation.featureShortTitle),
          searchKeywords:
            translation.featureSearchKeywords &&
            translation.featureSearchKeywords.trim() !== ''
              ? translation.featureSearchKeywords
                  .split(',')
                  .filter((keyword) => keyword.trim() !== '')
              : null,
        }),
      ) || []),
    ];

    const roles =
      feature.featureRoles?.nodes.length > 0
        ? feature.featureRoles.nodes.map((role) => role.roleCode)
        : [];

    const settingsByRole: SettingsByRole[] =
      feature.featurePositionsByRole?.nodes.map((positionByRole) => ({
        position: positionByRole.positionByRolePosition,
        role: positionByRole.positionByRoleRole.node.roleCode,
      })) ?? [];

    return {
      id: feature.databaseId.toString(),
      description: normalizeEmptyStringToNull(feature.featureDescription),
      icon: normalizeEmptyStringToNull(feature.featureIcon),
      iconSvgDark: normalizeEmptyStringToNull(feature.featureIconSvgDark),
      iconSvgLight: normalizeEmptyStringToNull(feature.featureIconSvgLight),
      menu: feature.featureMenu,
      position: feature.featurePosition,
      routerLink: normalizeEmptyStringToNull(feature.featureRouterLink),
      link: normalizeEmptyStringToNull(feature.featureLinkUrl),
      ssoService: normalizeEmptyStringToNull(feature.featureSsoService),
      statisticName: normalizeEmptyStringToNull(feature.featureStatisticName),
      type: feature.featureType,
      authorization:
        feature.featureAccessRestriction &&
        feature.featureAccessRestriction !== 'NONE'
          ? {
              type: feature.featureAccessRestriction,
              roles,
            }
          : null,
      settingsByRole,
      translations,
    };
  }

  async getFeatures(): Promise<Features[]> {
    const cached = await this.cacheService.get<Features[]>(
      CacheCollection.FEATURES,
    );
    if (cached) {
      return cached;
    }

    const data = await this.wordpressService.executeGraphQLQuery(`
      query {
        features(first: 100, where: {language: ${FRENCH_CODE}}) {
          nodes {
            databaseId
            featureTitle
            featureShortTitle
            featureSearchKeywords
            featureDescription
            featureIcon
            featureIconSvgLight
            featureIconSvgDark
            featureMenu
            featureAccessRestriction
            featureRoles(first: 100) {
              nodes {
                databaseId
                roleCode
                roleDescription
              }
            }
            featurePosition
            featurePositionsByRole(first: 100) {
              nodes {
                databaseId
                positionByRolePosition
                positionByRoleRole {
                  node {
                    databaseId
                    roleCode
                    roleDescription
                  }
                }
              }
            }
            featureType
            featureRouterLink
            featureLinkUrl
            featureSsoService
            featureStatisticName
            translations {
              databaseId
              featureShortTitle
              featureTitle
              featureSearchKeywords
              language {
                code
                locale
                name
              }
            }
          }
        }
      }
    `);

    const result = data.features.nodes.map(this.mapToMultiModel);
    await this.cacheService.set(CacheCollection.FEATURES, result);
    return result;
  }

  async getFeature(id: number): Promise<Features> {
    const cached = await this.cacheService.get<Features>(
      CacheCollection.FEATURES,
      id,
    );
    if (cached) {
      return cached;
    }

    const data = await this.wordpressService.executeGraphQLQuery(`
      query {
        feature(id: ${id}, idType: DATABASE_ID) {
          databaseId
          featureTitle
          featureShortTitle
          featureSearchKeywords
          featureDescription
          featureIcon
          featureIconSvgLight
          featureIconSvgDark
          featureMenu
          featureAccessRestriction
          featureRoles(first: 100) {
            nodes {
              databaseId
              roleCode
              roleDescription
            }
          }
          featurePosition
          featurePositionsByRole(first: 100) {
            nodes {
              databaseId
              positionByRolePosition
              positionByRoleRole {
                node {
                  databaseId
                  roleCode
                  roleDescription
                }
              }
            }
          }
          featureType
          featureRouterLink
          featureSsoService
          featureStatisticName
          translations {
            databaseId
            featureShortTitle
            featureTitle
            featureSearchKeywords
            language {
              code
              locale
              name
            }
          }
        }
      }
    `);

    const result = this.mapToMultiModel(data.feature);
    await this.cacheService.set(CacheCollection.FEATURES, result, id);
    return result;
  }
}
