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
import { WidgetsDirectus } from '@directus/collections/widgets/widgets.directus.model';
import { Widgets } from '@common/models/widgets.model';
import { DirectusService } from '@directus/directus.service';
import { OnEvent } from '@nestjs/event-emitter';
import { ValidateMapping } from '@common/decorators/validate-mapping.decorator';
import { normalizeEmptyStringToNull } from '@common/utils/normalize';
import { WidgetsSchema } from '@common/validation/schemas/widgets.schema';
import { CacheService } from '@cache/cache.service';
import { CacheCollection } from '@cache/cache.config';

@Injectable()
export class WidgetsDirectusService {
  private readonly logger = new Logger(WidgetsDirectusService.name);
  constructor(
    private readonly directusService: DirectusService,
    private readonly cacheService: CacheService,
  ) {}

  @OnEvent('directus.widgets.cache.cleared')
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
  private mapToMultiModel(widget: WidgetsDirectus): Widgets {
    return {
      id: widget.id.toString(),
      authorization: widget.authorization
        ? {
            type: widget.authorization.type,
            roles: widget.authorization.roles,
          }
        : null,
      color: normalizeEmptyStringToNull(widget.color),
      description: normalizeEmptyStringToNull(widget.description),
      icon: normalizeEmptyStringToNull(widget.icon),
      iconSvgDark: normalizeEmptyStringToNull(widget.iconSourceSvgDarkTheme),
      iconSvgLight: normalizeEmptyStringToNull(widget.iconSourceSvgLightTheme),
      link: normalizeEmptyStringToNull(widget.link),
      position: widget.position || 0,
      routerLink: normalizeEmptyStringToNull(widget.routerLink),
      ssoService: normalizeEmptyStringToNull(widget.ssoService),
      statisticName: normalizeEmptyStringToNull(widget.statisticName),
      type: widget.type,
      widget: widget.widget,
      translations:
        widget.translations.map((translation) => ({
          languagesCode: translation.languages_code.code,
          content: normalizeEmptyStringToNull(translation.content),
          title: normalizeEmptyStringToNull(translation.title),
        })) ?? [],
      settingsByRole:
        widget.settings_by_role?.map((settings) => ({
          role: settings.settings_by_role_id.role,
          position: settings.settings_by_role_id.position || 0,
        })) ?? [],
    };
  }

  async getWidgets(): Promise<Widgets[]> {
    return this.cacheService.getOrFetchWithLock(CacheCollection.WIDGETS, () =>
      this.loadWidgetsFromDirectus(),
    );
  }

  private async loadWidgetsFromDirectus(): Promise<Widgets[]> {
    this.logger.debug('Loading widgets from Directus...');
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
    return this.cacheService.getOrFetchWithLock(
      CacheCollection.WIDGETS,
      () => this.loadWidgetFromDirectus(id),
      id,
    );
  }

  private async loadWidgetFromDirectus(id: number): Promise<Widgets> {
    this.logger.debug(`Loading widget ${id} from Directus...`);
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
