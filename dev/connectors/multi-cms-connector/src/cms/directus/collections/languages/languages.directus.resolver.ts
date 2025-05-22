import { Args, Query, Resolver } from '@nestjs/graphql';
import { LanguagesDirectusService } from './languages.directus.service';
import { Languages } from '@common/models/languages.model';

@Resolver(() => Languages)
export class LanguagesDirectusResolver {
  constructor(private readonly languagesService: LanguagesDirectusService) {}

  // Définition de la requête GraphQL qui sera exécutée depuis le backend de Multi
  @Query(() => [Languages], { name: 'languages' })
  async getLanguages(): Promise<Languages[]> {
    return this.languagesService.getLanguages();
  }

  @Query(() => Languages, { name: 'language' })
  async getLanguage(
    @Args('code', { type: () => String }) code: string,
  ): Promise<Languages> {
    return this.languagesService.getLanguage(code);
  }
}
