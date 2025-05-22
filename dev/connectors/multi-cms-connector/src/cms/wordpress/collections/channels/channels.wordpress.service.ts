import { Injectable } from '@nestjs/common';
import { ChannelsWordpress } from '@wordpress/collections/channels/channels.wordpress.model';
import { Channels } from '@common/models/channels.model';
import { WordpressService } from '@wordpress/wordpress.service';
import { ChannelsTranslations } from '@common/models/translations.model';
import { ChannelsTranslationsWordpress } from '@wordpress/collections/translations/translations.wordpress.model';

const FRENCH_CODE = 'FR';
@Injectable()
export class ChannelsWordpressService {
  constructor(private readonly wordpressService: WordpressService) {}

  private mapToMultiModel(channel: ChannelsWordpress): Channels {
    const frTranslation: ChannelsTranslations = {
      languagesCode: FRENCH_CODE.toLowerCase(),
      label: channel.channelLabel,
    };

    const translations: ChannelsTranslations[] = [
      frTranslation,
      ...(channel.translations?.map(
        (translation: ChannelsTranslationsWordpress) => ({
          id: translation.databaseId,
          languagesCode: translation.language.code.toLowerCase(),
          label: translation.channelLabel,
        }),
      ) || []),
    ];

    return {
      id: channel.databaseId.toString(),
      code: channel.channelCode,
      color: channel.channelColor,
      filterable: channel.channelFilterable,
      icon: channel.channelIcon,
      routerLink: channel.channelRouterLink,
      translations,
    };
  }

  async getChannels(): Promise<Channels[]> {
    const data = await this.wordpressService.executeGraphQLQuery(`
      query {
        channels(where: { language: ${FRENCH_CODE} }) {
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
    return data.channels.nodes.map(this.mapToMultiModel);
  }

  async getChannel(id: number): Promise<Channels> {
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
    return this.mapToMultiModel(data.channel);
  }
}
