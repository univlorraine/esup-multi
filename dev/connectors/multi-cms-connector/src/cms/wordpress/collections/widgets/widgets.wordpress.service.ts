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
import { WordpressService } from '@wordpress/wordpress.service';
import { Widgets } from '@common/models/widgets.model';
import { WidgetsTranslations } from '@common/models/translations.model';
import { WidgetsTranslationsWordpress } from '@wordpress/collections/translations/translations.wordpress.model';
import { WidgetsWordpress } from '@wordpress/collections/widgets/widgets.wordpress.model';
import { SettingsByRole } from '@common/models/settings-by-role.model';
import { OnEvent } from '@nestjs/event-emitter';
import { ValidateMapping } from '@common/decorators/validate-mapping.decorator';
import { normalizeEmptyStringToNull } from '@common/utils/normalize';
import { WidgetsSchema } from '@common/validation/schemas/widgets.schema';
import { CacheService } from '@cache/cache.service';
import { CacheCollection } from '@cache/cache.config';

// TODO: Move FRENCH_CODE to .env and rename it to DEFAULT_LANGUAGE_CODE
const FRENCH_CODE = 'FR';

@Injectable()
export class WidgetsWordpressService {
  private readonly logger = new Logger(WidgetsWordpressService.name);
  constructor(
    private readonly wordpressService: WordpressService,
    private readonly cacheService: CacheService,
  ) {}

  @OnEvent('wordpress.widgets.cache.cleared')
  async handleCacheCleared() {
    this.logger.log('Received cache cleared event - preloading data...');
    try {
      await this.preloadData();
    } catch (error) {
      this.logger.error(
        'Failed to preload widgets after cache clear:',
        error.message,
      );
    }
  }

  public async preloadData() {
    this.logger.log('Preloading widgets...');
    await this.getWidgets();
    this.logger.log('Widgets preloaded successfully');
  }

  @ValidateMapping({ schema: WidgetsSchema })
  private mapToMultiModel(widget: WidgetsWordpress): Widgets {
    const frTranslation: WidgetsTranslations = {
      languagesCode: FRENCH_CODE.toLowerCase(),
      title: normalizeEmptyStringToNull(widget.widgetTitle),
      content: normalizeEmptyStringToNull(widget.widgetContent),
    };

    const translations: WidgetsTranslations[] = [
      frTranslation,
      ...(widget.translations?.map(
        (translation: WidgetsTranslationsWordpress) => ({
          languagesCode: translation.language.code.toLowerCase(),
          title: normalizeEmptyStringToNull(translation.widgetTitle),
          content: normalizeEmptyStringToNull(translation.widgetContent),
        }),
      ) || []),
    ];

    const roles =
      widget.widgetRoles?.nodes.length > 0
        ? widget.widgetRoles.nodes.map((role) => role.roleCode)
        : [];

    const settingsByRole: SettingsByRole[] =
      widget.widgetPositionsByRole?.nodes.map((positionByRole) => ({
        position: positionByRole.positionByRolePosition,
        role: positionByRole.positionByRoleRole.node.roleCode,
      })) ?? [];

    return {
      id: widget.databaseId.toString(),
      description: normalizeEmptyStringToNull(widget.widgetDescription),
      widget: widget.widgetCode,
      icon: normalizeEmptyStringToNull(widget.widgetIcon),
      iconSvgDark: normalizeEmptyStringToNull(widget.widgetIconSvgDark),
      iconSvgLight: normalizeEmptyStringToNull(widget.widgetIconSvgLight),
      position: widget.widgetPosition,
      routerLink: normalizeEmptyStringToNull(widget.widgetRouterLink),
      link: normalizeEmptyStringToNull(widget.widgetLinkUrl),
      ssoService: normalizeEmptyStringToNull(widget.widgetSsoService),
      statisticName: normalizeEmptyStringToNull(widget.widgetStatisticName),
      color: normalizeEmptyStringToNull(widget.widgetColor),
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
    return this.cacheService.getOrFetchWithLock(CacheCollection.WIDGETS, () =>
      this.loadWidgetsFromWordpress(),
    );
  }

  private async loadWidgetsFromWordpress(): Promise<Widgets[]> {
    this.logger.debug('Loading widgets from WordPress...');
    const data = await this.wordpressService.executeGraphQLQuery(`
      query {
        widgets(first: 100, where: {language: ${FRENCH_CODE}}) {
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
            widgetRoles(first: 100) {
              nodes {
                databaseId
                roleCode
                roleDescription
              }
            }
            widgetPosition
            widgetPositionsByRole(first: 100) {
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
    return this.cacheService.getOrFetchWithLock(
      CacheCollection.WIDGETS,
      () => this.loadWidgetFromWordpress(id),
      id,
    );
  }

  private async loadWidgetFromWordpress(id: number): Promise<Widgets> {
    this.logger.debug(`Loading widget ${id} from WordPress...`);
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
          widgetRoles(first: 100) {
            nodes {
              databaseId
              roleCode
              roleDescription
            }
          }
          widgetPosition
          widgetPositionsByRole(first: 100) {
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
