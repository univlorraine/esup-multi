import { Args, Query, Resolver } from '@nestjs/graphql';
import { StaticPagesWordpressService } from './static-pages.wordpress.service';
import { StaticPages } from '@common/models/static-pages.model';

@Resolver(() => StaticPages)
export class StaticPagesWordpressResolver {
  constructor(
    private readonly staticPagesService: StaticPagesWordpressService,
  ) {}

  // Définition de la requête GraphQL qui sera exécutée depuis le backend de Multi
  @Query(() => [StaticPages], { name: 'staticPages' })
  async getStaticPages(): Promise<StaticPages[]> {
    return this.staticPagesService.getStaticPages();
  }

  @Query(() => StaticPages, { name: 'staticPage' })
  async getStaticPage(
    @Args('id', { type: () => String }) id: string,
  ): Promise<StaticPages> {
    return this.staticPagesService.getStaticPage(Number(id));
  }
}
