import { Injectable } from '@nestjs/common';
import { SocialNetworks } from '@common/models/social-networks.model';
import { SocialNetworksWordpress } from './social-networks.wordpress.model';
import { WordpressService } from '@wordpress/wordpress.service';

@Injectable()
export class SocialNetworksWordpressService {
  constructor(private readonly wordpressService: WordpressService) {}

  private mapToMultiModel(network: SocialNetworksWordpress): SocialNetworks {
    return {
      id: network.databaseId.toString(),
      title: network.socialNetworkName,
      icon: network.socialNetworkIcon,
      link: network.socialNetworkLinkUrl,
      position: network.socialNetworkPosition,
    };
  }

  async getSocialNetworks(): Promise<SocialNetworks[]> {
    const data = await this.wordpressService.executeGraphQLQuery(`
      query {
        socialNetworks {
          nodes {
            databaseId
            socialNetworkName
            socialNetworkIcon
            socialNetworkLinkUrl
            socialNetworkPosition
          }
        }
      }
    `);
    return data.socialNetworks.nodes.map(this.mapToMultiModel);
  }

  async getSocialNetwork(id: number): Promise<SocialNetworks> {
    const data = await this.wordpressService.executeGraphQLQuery(`
      query {
        socialNetwork(id: ${id}, idType: DATABASE_ID) {
          databaseId
          socialNetworkName
          socialNetworkIcon
          socialNetworkLinkUrl
          socialNetworkPosition
        }
      }
    `);
    return this.mapToMultiModel(data.socialNetwork);
  }
}
