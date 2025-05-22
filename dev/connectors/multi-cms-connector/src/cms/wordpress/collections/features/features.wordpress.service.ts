import { Injectable } from '@nestjs/common';
import { Features } from '@common/models/features.model';
import { WordpressService } from '@wordpress/wordpress.service';
import { FeaturesTranslations } from '@common/models/translations.model';
import { FeaturesTranslationsWordpress } from '@wordpress/collections/translations/translations.wordpress.model';
import { FeaturesWordpress } from '@wordpress/collections/features/features.wordpress.model';
import { SettingsByRole } from '@common/models/settings-by-role.model';

const FRENCH_CODE = 'FR';

@Injectable()
export class FeaturesWordpressService {
  constructor(private readonly wordpressService: WordpressService) {}

  private mapToMultiModel(feature: FeaturesWordpress): Features {
    const frTranslation: FeaturesTranslations = {
      languagesCode: FRENCH_CODE.toLowerCase(),
      title: feature.featureTitle,
      shortTitle: feature.featureShortTitle,
      searchKeywords:
        feature.featureSearchKeywords &&
        feature.featureSearchKeywords.trim() !== ''
          ? feature.featureSearchKeywords
              .split(',')
              .filter((keyword) => keyword.trim() !== '')
          : [],
    };

    const translations: FeaturesTranslations[] = [
      frTranslation,
      ...(feature.translations?.map(
        (translation: FeaturesTranslationsWordpress) => ({
          id: translation.databaseId,
          languagesCode: translation.language.code.toLowerCase(),
          title: translation.featureTitle,
          shortTitle: translation.featureShortTitle,
          searchKeywords:
            translation.featureSearchKeywords &&
            translation.featureSearchKeywords.trim() !== ''
              ? translation.featureSearchKeywords
                  .split(',')
                  .filter((keyword) => keyword.trim() !== '')
              : [],
        }),
      ) || []),
    ];

    const roles =
      feature.featureRoles?.nodes.length > 0
        ? feature.featureRoles.nodes.map((role) => role.roleCode)
        : null;

    const settingsByRole: SettingsByRole[] =
      feature.featurePositionsByRole?.nodes.map((positionByRole) => ({
        position: positionByRole.positionByRolePosition,
        role: positionByRole.positionByRoleRole.node.roleCode,
      })) || [];

    return {
      id: feature.databaseId.toString(),
      description: feature.featureDescription,
      icon: feature.featureIcon,
      iconSvgDark: feature.featureIconSvgDark,
      iconSvgLight: feature.featureIconSvgLight,
      menu: feature.featureMenu,
      position: feature.featurePosition,
      routerLink: feature.featureRouterLink,
      link: feature.featureLinkUrl,
      ssoService: feature.featureSsoService,
      statisticName: feature.featureStatisticName,
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
    const data = await this.wordpressService.executeGraphQLQuery(`
      query {
        features(where: {language: ${FRENCH_CODE}}) {
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
            featureRoles {
              nodes {
                databaseId
                roleCode
                roleDescription
              }
            }
            featurePosition
            featurePositionsByRole {
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
    return data.features.nodes.map(this.mapToMultiModel);
  }

  async getFeature(id: number): Promise<Features> {
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
          featureRoles {
            nodes {
              databaseId
              roleCode
              roleDescription
            }
          }
          featurePosition
          featurePositionsByRole {
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
    return this.mapToMultiModel(data.feature);
  }
}
