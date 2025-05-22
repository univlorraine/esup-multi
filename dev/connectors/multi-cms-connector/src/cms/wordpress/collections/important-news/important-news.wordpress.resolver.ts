import { Args, Query, Resolver } from '@nestjs/graphql';
import { ImportantNewsWordpressService } from './important-news.wordpress.service';
import { ImportantNews } from '@common/models/important-news.model';

@Resolver(() => ImportantNews)
export class ImportantNewsWordpressResolver {
  constructor(
    private readonly importantNewsService: ImportantNewsWordpressService,
  ) {}

  // Définition de la requête GraphQL qui sera exécutée depuis le backend de Multi
  @Query(() => [ImportantNews], { name: 'importantNews' })
  async getImportantNews(): Promise<ImportantNews[]> {
    return this.importantNewsService.getImportantNews();
  }

  @Query(() => ImportantNews, { name: 'importantNew' })
  async getImportantNew(
    @Args('id', { type: () => String }) id: string,
  ): Promise<ImportantNews> {
    return this.importantNewsService.getImportantNew(Number(id));
  }
}
