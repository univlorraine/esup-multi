import { Args, Query, Resolver } from '@nestjs/graphql';
import { PagesDirectusService } from './pages.directus.service';
import { StaticPages } from '@common/models/static-pages.model';

@Resolver(() => StaticPages)
export class PagesDirectusResolver {
  constructor(private readonly pagesService: PagesDirectusService) {}

  // Définition de la requête GraphQL qui sera exécutée depuis le backend de Multi
  @Query(() => [StaticPages], { name: 'staticPages' })
  async getPages(): Promise<StaticPages[]> {
    return this.pagesService.getPages();
  }

  @Query(() => StaticPages, { name: 'staticPage' })
  async getPage(
    @Args('id', { type: () => String }) id: string,
  ): Promise<StaticPages> {
    return this.pagesService.getPage(Number(id));
  }
}
