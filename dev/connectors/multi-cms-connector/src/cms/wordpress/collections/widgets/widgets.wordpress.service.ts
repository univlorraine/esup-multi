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
