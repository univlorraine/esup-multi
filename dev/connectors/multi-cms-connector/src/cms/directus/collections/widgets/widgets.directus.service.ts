import { Injectable } from '@nestjs/common';
import { WidgetsDirectus } from '@directus/collections/widgets/widgets.directus.model';
import { Widgets } from '@common/models/widgets.model';
import { DirectusService } from '@directus/directus.service';

@Injectable()
export class WidgetsDirectusService {
  constructor(private readonly directusService: DirectusService) {}

  private mapToMultiModel(widget: WidgetsDirectus): Widgets {
    return {
      id: widget.id.toString(),
      authorization: widget.authorization
        ? {
            type: widget.authorization.type,
            roles: widget.authorization.roles,
          }
        : null,
      color: widget.color,
      description: widget.description,
      icon: widget.icon,
      iconSvgDark: widget.iconSourceSvgDarkTheme,
      iconSvgLight: widget.iconSourceSvgLightTheme,
      link: widget.link,
      position: widget.position,
      routerLink: widget.routerLink,
      ssoService: widget.ssoService,
      statisticName: widget.statisticName,
      type: widget.type,
      widget: widget.widget,
      translations: widget.translations.map((translation) => ({
        id: translation.id,
        languagesCode: translation.languages_code.code,
        content: translation.content,
        title: translation.title,
      })),
      settingsByRole: widget.settings_by_role.map((settings) => ({
        role: settings.settings_by_role_id.role,
        position: settings.settings_by_role_id.position,
      })),
    };
  }

  async getWidgets(): Promise<Widgets[]> {
    const data = await this.directusService.executeGraphQLQuery(`
      query {
        widgets(filter: { status: { _eq: "published" }}) {
          id
          description
          icon
          iconSourceSvgDarkTheme
          iconSourceSvgLightTheme
          link
          color
          position
          routerLink
          ssoService
          statisticName
          status
          type
          widget
          translations {
            id
            languages_code {
              code
              name
              direction
            }
            content
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
    return data.widgets.map(this.mapToMultiModel);
  }

  async getWidget(id: number): Promise<Widgets> {
    const data = await this.directusService.executeGraphQLQuery(`
      query {
        widgets(filter: {id: { _eq: ${id} }}) {
          id
          description
          icon
          iconSourceSvgDarkTheme
          iconSourceSvgLightTheme
          link
          color
          position
          routerLink
          ssoService
          statisticName
          status
          type
          widget
          translations {
            id
            languages_code {
              code
              name
              direction
            }
            content
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
    return this.mapToMultiModel(data.widgets[0]);
  }
}
