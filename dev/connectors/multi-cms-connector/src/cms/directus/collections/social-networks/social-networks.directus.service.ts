import { Injectable } from '@nestjs/common';
import { SocialNetworks } from '@common/models/social-networks.model';
import { SocialNetworksDirectus } from './social-networks.directus.model';
import { DirectusService } from '@directus/directus.service';

@Injectable()
export class SocialNetworksDirectusService {
  constructor(private readonly directusService: DirectusService) {}

  private mapToMultiModel(network: SocialNetworksDirectus): SocialNetworks {
    return {
      id: network.id.toString(),
      icon: network.icon,
      title: network.title,
      link: network.link,
      position: network.sort,
    };
  }

  async getSocialNetworks(): Promise<SocialNetworks[]> {
    const data = await this.directusService.executeGraphQLQuery(`
      query {
        social_networks {
          id
          title
          link
          icon
          sort
        }
      }
    `);
    return data.social_networks.map(this.mapToMultiModel);
  }

  async getSocialNetwork(id: number): Promise<SocialNetworks> {
    const data = await this.directusService.executeGraphQLQuery(`
      query {
        social_networks(filter: { id: { _eq: ${id} } }) {
          id
          title
          link
          icon
          sort
        }
      }
    `);
    return this.mapToMultiModel(data.social_networks[0]);
  }
}
