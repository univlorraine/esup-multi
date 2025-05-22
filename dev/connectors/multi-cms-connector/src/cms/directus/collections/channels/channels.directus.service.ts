import { Injectable } from '@nestjs/common';
import { ChannelsDirectus } from '@directus/collections/channels/channels.directus.model';
import { Channels } from '@common/models/channels.model';
import { DirectusService } from '@directus/directus.service';

@Injectable()
export class ChannelsDirectusService {
  constructor(private readonly directusService: DirectusService) {}

  private mapToMultiModel(channel: ChannelsDirectus): Channels {
    return {
      id: channel.id.toString(),
      code: channel.code,
      color: channel.color,
      filterable: channel.filterable,
      icon: channel.icon,
      routerLink: channel.routerLink,
      translations: channel.translations.map((translation) => ({
        id: translation.id,
        languagesCode: translation.languages_code.code,
        label: translation.label,
      })),
    };
  }

  async getChannels(): Promise<Channels[]> {
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
    return data.channels.map(this.mapToMultiModel);
  }

  async getChannel(id: number): Promise<Channels> {
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
    return this.mapToMultiModel(data.channels[0]);
  }
}
