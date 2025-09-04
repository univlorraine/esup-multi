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
import { SocialNetworks } from '@common/models/social-networks.model';
import { SocialNetworksWordpress } from './social-networks.wordpress.model';
import { WordpressService } from '@wordpress/wordpress.service';
import { OnEvent } from '@nestjs/event-emitter';
import { ValidateMapping } from '@common/decorators/validate-mapping.decorator';
import { SocialNetworksSchema } from '@common/validation/schemas/social-networks.schema';
import { CacheService } from '@cache/cache.service';
import { CacheCollection } from '@cache/cache.config';

@Injectable()
export class SocialNetworksWordpressService {
  private readonly logger = new Logger(SocialNetworksWordpressService.name);
  constructor(
    private readonly wordpressService: WordpressService,
    private readonly cacheService: CacheService,
  ) {}

  @OnEvent('wordpress.social-networks.cache.cleared')
  async handleCacheCleared() {
    this.logger.log('Received cache cleared event - preloading data...');
    try {
      await this.preloadData();
    } catch (error) {
      this.logger.error(
        'Failed to preload social-networks after cache clear:',
        error.message,
      );
    }
  }

  public async preloadData() {
    this.logger.log('Preloading social-networks...');
    await this.getSocialNetworks();
    this.logger.log('Social-networks preloaded successfully');
  }

  @ValidateMapping({ schema: SocialNetworksSchema })
  private mapToMultiModel(network: SocialNetworksWordpress): SocialNetworks {
    return {
      id: network.databaseId.toString(),
      title: network.socialNetworkName,
      icon: network.socialNetworkIcon,
      link: network.socialNetworkLinkUrl,
      position: network.socialNetworkPosition || 0,
    };
  }

  async getSocialNetworks(): Promise<SocialNetworks[]> {
    return this.cacheService.getOrFetchWithLock(
      CacheCollection.SOCIAL_NETWORKS,
      () => this.loadSocialNetworksFromWordpress(),
    );
  }

  private async loadSocialNetworksFromWordpress(): Promise<SocialNetworks[]> {
    this.logger.debug('Loading social networks from WordPress...');
    const data = await this.wordpressService.executeGraphQLQuery(`
      query {
        socialNetworks(first: 100) {
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
    return this.cacheService.getOrFetchWithLock(
      CacheCollection.SOCIAL_NETWORKS,
      () => this.loadSocialNetworkFromWordpress(id),
      id,
    );
  }

  private async loadSocialNetworkFromWordpress(
    id: number,
  ): Promise<SocialNetworks> {
    this.logger.debug(`Loading social network ${id} from WordPress...`);
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
