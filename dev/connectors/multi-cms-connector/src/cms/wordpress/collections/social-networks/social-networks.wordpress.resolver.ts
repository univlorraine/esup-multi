import { Args, Query, Resolver } from '@nestjs/graphql';
import { SocialNetworksWordpressService } from './social-networks.wordpress.service';
import { SocialNetworks } from '@common/models/social-networks.model';

@Resolver(() => SocialNetworks)
export class SocialNetworksWordpressResolver {
  constructor(
    private readonly socialNetworksService: SocialNetworksWordpressService,
  ) {}

  // Définition de la requête GraphQL qui sera exécutée depuis le backend de Multi
  @Query(() => [SocialNetworks], { name: 'socialNetworks' })
  async getSocialNetworks(): Promise<SocialNetworks[]> {
    return this.socialNetworksService.getSocialNetworks();
  }

  @Query(() => SocialNetworks, { name: 'socialNetwork' })
  async getSocialNetwork(
    @Args('id', { type: () => String }) id: string,
  ): Promise<SocialNetworks> {
    return this.socialNetworksService.getSocialNetwork(Number(id));
  }
}
