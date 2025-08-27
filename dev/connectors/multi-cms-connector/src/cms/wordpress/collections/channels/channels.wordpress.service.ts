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
import { OnEvent } from '@nestjs/event-emitter';
import { ChannelsWordpress } from '@wordpress/collections/channels/channels.wordpress.model';
import { Channels } from '@common/models/channels.model';
import { WordpressService } from '@wordpress/wordpress.service';
import { ChannelsTranslations } from '@common/models/translations.model';
import { ChannelsTranslationsWordpress } from '@wordpress/collections/translations/translations.wordpress.model';
import { normalizeEmptyStringToNull } from '@common/utils/normalize';
import { ValidateMapping } from '@common/decorators/validate-mapping.decorator';
import { ChannelsSchema } from '@common/validation/schemas/channels.schema';
import { CacheService } from '@cache/cache.service';
import { CacheCollection } from '@cache/cache.config';

// TODO: Move FRENCH_CODE to .env and rename it to DEFAULT_LANGUAGE_CODE
const FRENCH_CODE = 'FR';
@Injectable()
export class ChannelsWordpressService {
  private readonly logger = new Logger(ChannelsWordpressService.name);
  constructor(
    private readonly wordpressService: WordpressService,
    private readonly cacheService: CacheService,
  ) {}

  @OnEvent('wordpress.channels.cache.cleared')
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
  private mapToMultiModel(channel: ChannelsWordpress): Channels {
    const frTranslation: ChannelsTranslations = {
      languagesCode: FRENCH_CODE.toLowerCase(),
      label: channel.channelLabel,
    };

    const translations: ChannelsTranslations[] = [
      frTranslation,
      ...(channel.translations?.map(
        (translation: ChannelsTranslationsWordpress) => ({
          languagesCode: translation.language.code.toLowerCase(),
          label: translation.channelLabel,
        }),
      ) || []),
    ];

    return {
      id: channel.databaseId.toString(),
      code: channel.channelCode,
      color: normalizeEmptyStringToNull(channel.channelColor),
      filterable: channel.channelFilterable,
      icon: normalizeEmptyStringToNull(channel.channelIcon),
      routerLink: normalizeEmptyStringToNull(channel.channelRouterLink),
      translations,
    };
  }

  async getChannels(): Promise<Channels[]> {
    const cached = await this.cacheService.get<Channels[]>(
      CacheCollection.CHANNELS,
    );
    if (cached) {
      return cached;
    }

    const data = await this.wordpressService.executeGraphQLQuery(`
      query {
        channels(first: 100, where: { language: ${FRENCH_CODE} }) {
          nodes {
            databaseId
            channelCode
            channelColor
            channelIcon
            channelRouterLink
            channelFilterable
            channelLabel
            translations {
              databaseId
              language {
                code
                locale
                name
              }
              channelLabel
            }
          }
        }
      }
    `);
    const result = data.channels.nodes.map(this.mapToMultiModel);
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

    const data = await this.wordpressService.executeGraphQLQuery(`
      query {
        channel(id: ${id}, idType: DATABASE_ID) {
          databaseId
          channelCode
          channelColor
          channelIcon
          channelRouterLink
          channelFilterable
          channelLabel
          translations {
            databaseId
            language {
              code
              locale
              name
            }
            channelLabel
          }
        }
      }
    `);
    const result = this.mapToMultiModel(data.channel);
    await this.cacheService.set(CacheCollection.CHANNELS, result, id);
    return result;
  }
}
