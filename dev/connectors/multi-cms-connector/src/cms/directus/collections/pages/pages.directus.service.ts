import { Injectable } from '@nestjs/common';
import { PagesDirectus } from '@directus/collections/pages/pages.directus.model';
import { StaticPages } from '@common/models/static-pages.model';
import { DirectusService } from '@directus/directus.service';

@Injectable()
export class PagesDirectusService {
  constructor(private readonly directusService: DirectusService) {}

  private mapToMultiModel(page: PagesDirectus): StaticPages {
    return {
      id: page.id.toString(),
      icon: page.icon,
      iconSvgDark: page.iconSourceSvgDarkTheme,
      iconSvgLight: page.iconSourceSvgLightTheme,
      position: page.sort,
      statisticName: page.statisticName,
      translations: page.translations.map((translation) => ({
        id: translation.id,
        languagesCode: translation.languages_code.code,
        title: translation.title,
        content: translation.content,
      })),
    };
  }

  async getPages(): Promise<StaticPages[]> {
    const data = await this.directusService.executeGraphQLQuery(`
      query {
        pages(filter: { status: { _eq: "published" }}) {
          id
          status
          icon
          iconSourceSvgLightTheme
          iconSourceSvgDarkTheme
          sort
          statisticName
          translations {
              id
              title
              content
              languages_code {
                  code
                  direction
                  name
              }
          }
        }
      }
    `);
    return data.pages.map(this.mapToMultiModel);
  }

  async getPage(id: number): Promise<StaticPages> {
    const data = await this.directusService.executeGraphQLQuery(`
      query {
        pages(filter: {id: { _eq: ${id} }}) {
          id
          status
          icon
          iconSourceSvgLightTheme
          iconSourceSvgDarkTheme
          sort
          statisticName
          translations {
              id
              title
              content
              languages_code {
                  code
                  direction
                  name
              }
          }
        }
      }
    `);
    return this.mapToMultiModel(data.pages[0]);
  }
}
