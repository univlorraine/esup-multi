import { Injectable } from '@nestjs/common';
import { Languages } from '@common/models/languages.model';
import { WordpressService } from '@wordpress/wordpress.service';
import { LanguagesWordpress } from '@wordpress/collections/languages/languages.wordpress.model';

@Injectable()
export class LanguagesWordpressService {
  constructor(private readonly wordpressService: WordpressService) {}

  private mapToMultiModel(language: LanguagesWordpress): Languages {
    return {
      name: language.name,
      direction: null,
      code: language.code,
      locale: language.locale,
    };
  }

  async getLanguages(): Promise<Languages[]> {
    const data = await this.wordpressService.executeGraphQLQuery(`
      query {
        languages {
          code
          name
          locale
        }
      }
    `);
    return data.languages.map(this.mapToMultiModel);
  }

  // Non supporté dans Wordpress
  // TODO: vérifier si la fonction est bien utile au niveau de multi
  // async getLanguage(code: string): Promise<Languages> {
  //   const data = await this.wordpressService.executeGraphQLQuery(`
  //     query {
  //       languages(filter: { code: { _eq: "${code}" } }) {
  //         code
  //         direction
  //         name
  //       }
  //     }
  //   `);
  //   return this.mapToMultiModel(data.languages[0]);
  // }
}
