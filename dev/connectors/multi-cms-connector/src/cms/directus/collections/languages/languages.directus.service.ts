import { Injectable } from '@nestjs/common';
import { LanguagesDirectus } from './languages.directus.model';
import { Languages } from '@common/models/languages.model';
import { DirectusService } from '@directus/directus.service';

@Injectable()
export class LanguagesDirectusService {
  constructor(private readonly directusService: DirectusService) {}

  private mapToMultiModel(language: LanguagesDirectus): Languages {
    return {
      name: language.name,
      direction: language.direction,
      code: language.code,
      locale: null,
    };
  }

  async getLanguages(): Promise<Languages[]> {
    const data = await this.directusService.executeGraphQLQuery(`
      query {
        languages {
          code
          direction
          name
        }
      }
    `);
    return data.languages.map(this.mapToMultiModel);
  }

  async getLanguage(code: string): Promise<Languages> {
    const data = await this.directusService.executeGraphQLQuery(`
      query {
        languages(filter: { code: { _eq: "${code}" } }) {
          code
          direction
          name
        }
      }
    `);
    return this.mapToMultiModel(data.languages[0]);
  }
}
