import { Injectable } from '@nestjs/common';
import { ImportantNewsDirectus } from '@directus/collections/important-news/important-news.directus.model';
import { ImportantNews } from '@common/models/important-news.model';
import { DirectusService } from '@directus/directus.service';

@Injectable()
export class ImportantNewsDirectusService {
  constructor(private readonly directusService: DirectusService) {}

  private mapToMultiModel(importantNew: ImportantNewsDirectus): ImportantNews {
    return {
      id: importantNew.id.toString(),
      authorization: importantNew.authorization
        ? {
            type: importantNew.authorization.type,
            roles: importantNew.authorization.roles,
          }
        : null,
      color: importantNew.color,
      image: importantNew.image?.id.toString(),
      link: importantNew.link,
      position: importantNew.sort,
      statisticName: importantNew.statisticName,
      translations: importantNew.translations.map((translation) => ({
        id: translation.id,
        languagesCode: translation.languages_code.code,
        title: translation.title,
        content: translation.content,
        buttonLabel: translation.buttonLabel,
      })),
    };
  }

  async getImportantNews(): Promise<ImportantNews[]> {
    const data = await this.directusService.executeGraphQLQuery(`
      query {
        important_news(filter: { status: { _eq: "published" } }) {
          id
          authorization {
             id
             roles
             type 
          }
          color
          image {
              id
          }
          link
          sort
          statisticName
          status
          translations {
              id
              buttonLabel
              content
              languages_code {
                  code
                  direction
                  name
              }
              title
          }
        }
      }
    `);
    return data.important_news.map(this.mapToMultiModel);
  }

  async getImportantNew(id: number): Promise<ImportantNews> {
    const data = await this.directusService.executeGraphQLQuery(`
      query {
        important_news(filter: {id: { _eq: ${id} }}) {
          id
          authorization {
             id
             roles
             type 
          }
          color
          image {
              id
          }
          link
          sort
          statisticName
          status
          translations {
              id
              buttonLabel
              content
              languages_code {
                  code
                  direction
                  name
              }
              title
          }
        }
      }
    `);
    return this.mapToMultiModel(data.important_news[0]);
  }
}
