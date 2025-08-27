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
import { ChannelsDirectus } from '@directus/collections/channels/channels.directus.model';
import { Channels } from '@common/models/channels.model';
import { DirectusService } from '@directus/directus.service';
import { OnEvent } from '@nestjs/event-emitter';
import { ValidateMapping } from '@common/decorators/validate-mapping.decorator';
import { ChannelsSchema } from '@common/validation/schemas/channels.schema';
import { normalizeEmptyStringToNull } from '@common/utils/normalize';
import { CacheService } from '@cache/cache.service';
import { CacheCollection } from '@cache/cache.config';

@Injectable()
export class ChannelsDirectusService {
  private readonly logger = new Logger(ChannelsDirectusService.name);
  constructor(
    private readonly directusService: DirectusService,
    private readonly cacheService: CacheService,
  ) {}

  @OnEvent('directus.channels.cache.cleared')
  async handleCacheCleared() {
    this.logger.log('Received cache cleared event - preloading data...');
    try {
      await this.preloadData();
    } catch (error) {
      this.logger.error(
        'Failed to preload channels after cache clear:',
        error.message,
      );
    }
  }

  public async preloadData() {
    this.logger.log('Preloading channels...');
    await this.getChannels();
    this.logger.log('Channels preloaded successfully');
  }

  @ValidateMapping({ schema: ChannelsSchema })
  private mapToMultiModel(channel: ChannelsDirectus): Channels {
    return {
      id: channel.id.toString(),
      code: channel.code,
      color: normalizeEmptyStringToNull(channel.color),
      filterable: channel.filterable,
      icon: normalizeEmptyStringToNull(channel.icon),
      routerLink: normalizeEmptyStringToNull(channel.routerLink),
      translations: channel.translations.map((translation) => ({
        id: translation.id,
        languagesCode: translation.languages_code.code,
        label: translation.label,
      })),
    };
  }

  async getChannels(): Promise<Channels[]> {
    const cached = await this.cacheService.get<Channels[]>(
      CacheCollection.CHANNELS,
    );
    if (cached) {
      return cached;
    }

    const data = await this.directusService.executeGraphQLQuery(`
      query {
        channels {
          id
          code
          color
          filterable
          icon
          routerLink
          translations {
              id
              label
              languages_code {
                  code
                  direction
                  name
              }
          }
        }
      }
    `);
    const result = data.channels.map(this.mapToMultiModel);
    await this.cacheService.set(CacheCollection.CHANNELS, result);
    return result;
  }

  async getChannel(id: number): Promise<Channels> {
    const cached = await this.cacheService.get<Channels>(
      CacheCollection.CHANNELS,
      id,
    );
    if (cached) {
      return cached;
    }

    const data = await this.directusService.executeGraphQLQuery(`
      query {
        channels(filter: {id: { _eq: ${id} }}) {
          id
          code
          color
          filterable
          icon
          routerLink
          translations {
              id
              label
              languages_code {
                  code
                  direction
                  name
              }
          }
        }
      }
    `);
    const result = this.mapToMultiModel(data.channels[0]);
    await this.cacheService.set(CacheCollection.CHANNELS, result, id);
    return result;
  }
}
