import { Injectable } from '@nestjs/common';
import { WordpressService } from '@wordpress/wordpress.service';
import { Widgets } from '@common/models/widgets.model';
import { WidgetsTranslations } from '@common/models/translations.model';
import { WidgetsTranslationsWordpress } from '@wordpress/collections/translations/translations.wordpress.model';
import { WidgetsWordpress } from '@wordpress/collections/widgets/widgets.wordpress.model';
import { SettingsByRole } from '@common/models/settings-by-role.model';

const FRENCH_CODE = 'FR';

@Injectable()
export class WidgetsWordpressService {
  constructor(private readonly wordpressService: WordpressService) {}

  private mapToMultiModel(widget: WidgetsWordpress): Widgets {
    const frTranslation: WidgetsTranslations = {
      languagesCode: FRENCH_CODE.toLowerCase(),
      title: widget.widgetTitle,
      content: widget.widgetContent,
    };

    const translations: WidgetsTranslations[] = [
      frTranslation,
      ...(widget.translations?.map(
        (translation: WidgetsTranslationsWordpress) => ({
          id: translation.databaseId,
          languagesCode: translation.language.code.toLowerCase(),
          title: translation.widgetTitle,
          content: translation.widgetContent,
        }),
      ) || []),
    ];

    const roles =
      widget.widgetRoles?.nodes.length > 0
        ? widget.widgetRoles.nodes.map((role) => role.roleCode)
        : null;

    const settingsByRole: SettingsByRole[] =
      widget.widgetPositionsByRole?.nodes.map((positionByRole) => ({
        position: positionByRole.positionByRolePosition,
        role: positionByRole.positionByRoleRole.node.roleCode,
      })) || [];

    return {
      id: widget.databaseId.toString(),
      description: widget.widgetDescription,
      widget: widget.widgetCode,
      icon: widget.widgetIcon,
      iconSvgDark: widget.widgetIconSvgDark,
      iconSvgLight: widget.widgetIconSvgLight,
      position: widget.widgetPosition,
      routerLink: widget.widgetRouterLink,
      link: widget.widgetLinkUrl,
      ssoService: widget.widgetSsoService,
      statisticName: widget.widgetStatisticName,
      color: widget.widgetColor,
      type: widget.widgetType,
      authorization:
        widget.widgetAccessRestriction &&
        widget.widgetAccessRestriction !== 'NONE'
          ? {
              type: widget.widgetAccessRestriction,
              roles,
            }
          : null,
      settingsByRole,
      translations,
    };
  }

  async getWidgets(): Promise<Widgets[]> {
    const data = await this.wordpressService.executeGraphQLQuery(`
      query {
        widgets(where: {language: ${FRENCH_CODE}}) {
          nodes {
            databaseId
            widgetTitle
            widgetDescription
            widgetContent
            widgetCode
            widgetIcon
            widgetIconSvgLight
            widgetIconSvgDark
            widgetAccessRestriction
            widgetRoles {
              nodes {
                databaseId
                roleCode
                roleDescription
              }
            }
            widgetPosition
            widgetPositionsByRole {
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
            widgetType
            widgetRouterLink
            widgetLinkUrl
            widgetSsoService
            widgetColor
            widgetStatisticName
            translations {
              databaseId
              widgetTitle
              widgetContent
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
    return data.widgets.nodes.map(this.mapToMultiModel);
  }

  async getWidget(id: number): Promise<Widgets> {
    const data = await this.wordpressService.executeGraphQLQuery(`
      query {
        widget(id: ${id}, idType: DATABASE_ID) {
          databaseId
          widgetTitle
          widgetDescription
          widgetContent
          widgetCode
          widgetIcon
          widgetIconSvgLight
          widgetIconSvgDark
          widgetAccessRestriction
          widgetRoles {
            nodes {
              databaseId
              roleCode
              roleDescription
            }
          }
          widgetPosition
          widgetPositionsByRole {
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
          widgetType
          widgetRouterLink
          widgetLinkUrl
          widgetSsoService
          widgetColor
          widgetStatisticName
          translations {
            databaseId
            widgetTitle
            widgetContent
            language {
              code
              locale
              name
            }
          }
        }
      }
    `);
    return this.mapToMultiModel(data.widget);
  }
}
