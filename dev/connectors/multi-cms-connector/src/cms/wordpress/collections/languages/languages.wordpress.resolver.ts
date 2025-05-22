import { Query, Resolver } from '@nestjs/graphql';
import { LanguagesWordpressService } from './languages.wordpress.service';
import { Languages } from '@common/models/languages.model';

@Resolver(() => Languages)
export class LanguagesWordpressResolver {
  constructor(private readonly languagesService: LanguagesWordpressService) {}

  // Définition de la requête GraphQL qui sera exécutée depuis le backend de Multi
  @Query(() => [Languages], { name: 'languages' })
  async getLanguages(): Promise<Languages[]> {
    return this.languagesService.getLanguages();
  }

  // Non disponible dans Wordpress
  // TODO: vérifier si la fonction est bien utile au niveau de multi
  // @Query(() => Languages, { name: 'language' })
  // async getLanguage(
  //   @Args('code', { type: () => String }) code: string,
  // ): Promise<Languages> {
  //   return this.languagesService.getLanguage(code);
  // }
}
