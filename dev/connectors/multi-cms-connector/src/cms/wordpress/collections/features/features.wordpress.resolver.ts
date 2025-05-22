import { Args, Query, Resolver } from '@nestjs/graphql';
import { FeaturesWordpressService } from './features.wordpress.service';
import { Features } from '@common/models/features.model';

@Resolver(() => Features)
export class FeaturesWordpressResolver {
  constructor(private readonly featuresService: FeaturesWordpressService) {}

  // Définition de la requête GraphQL qui sera exécutée depuis le backend de Multi
  @Query(() => [Features], { name: 'features' })
  async getFeatures(): Promise<Features[]> {
    return this.featuresService.getFeatures();
  }

  @Query(() => Features, { name: 'feature' })
  async getFeature(
    @Args('id', { type: () => String }) id: string,
  ): Promise<Features> {
    return this.featuresService.getFeature(Number(id));
  }
}
