import { Injectable } from '@nestjs/common';
import { Features } from '@common/models/features.model';
import { FeaturesDirectus } from '@directus/collections/features/features.directus.model';
import { DirectusService } from '@directus/directus.service';

@Injectable()
export class FeaturesDirectusService {
  constructor(private readonly directusService: DirectusService) {}

  private mapToMultiModel(feature: FeaturesDirectus): Features {
    return {
      id: feature.id.toString(),
      authorization: feature.authorization
        ? {
            type: feature.authorization.type,
            roles: feature.authorization.roles,
          }
        : null,
      description: feature.description,
      icon: feature.icon,
      iconSvgDark: feature.iconSourceSvgDarkTheme,
      iconSvgLight: feature.iconSourceSvgLightTheme,
      link: feature.link,
      menu: feature.menu,
      position: feature.position,
      routerLink: feature.routerLink,
      ssoService: feature.ssoService,
      statisticName: feature.statisticName,
      type: feature.type,
      translations: feature.translations.map((translation) => ({
        id: translation.id,
        languagesCode: translation.languages_code.code,
        searchKeywords: translation.searchKeywords,
        shortTitle: translation.shortTitle,
        title: translation.title,
      })),
      settingsByRole: feature.settings_by_role.map((settings) => ({
        role: settings.settings_by_role_id.role,
        position: settings.settings_by_role_id.position,
      })),
    };
  }

  async getFeatures(): Promise<Features[]> {
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
