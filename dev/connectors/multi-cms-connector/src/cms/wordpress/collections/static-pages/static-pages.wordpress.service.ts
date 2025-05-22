import { Injectable } from '@nestjs/common';
import { StaticPagesWordpress } from '@wordpress/collections/static-pages/static-pages.wordpress.model';
import { StaticPages } from '@common/models/static-pages.model';
import { WordpressService } from '@wordpress/wordpress.service';
import { StaticPagesTranslations } from '@common/models/translations.model';
import { StaticPagesTranslationsWordpress } from '@wordpress/collections/translations/translations.wordpress.model';

const FRENCH_CODE = 'FR';

@Injectable()
export class StaticPagesWordpressService {
  constructor(private readonly wordpressService: WordpressService) {}

  private mapToMultiModel(staticPage: StaticPagesWordpress): StaticPages {
    const frTranslation: StaticPagesTranslations = {
      languagesCode: FRENCH_CODE.toLowerCase(),
      title: staticPage.staticPageTitle,
      content: staticPage.staticPageContent,
    };

    const translations: StaticPagesTranslations[] = [
      frTranslation,
      ...(staticPage.translations?.map(
        (translation: StaticPagesTranslationsWordpress) => ({
          id: translation.databaseId,
          languagesCode: translation.language.code.toLowerCase(),
          title: translation.staticPageTitle,
          content: translation.staticPageContent,
        }),
      ) || []),
    ];

    return {
      id: staticPage.databaseId.toString(),
      icon: staticPage.staticPageLinkIcon,
      iconSvgDark: staticPage.staticPageIconSvgDark,
      iconSvgLight: staticPage.staticPageIconSvgLight,
      position: staticPage.staticPagePosition,
      statisticName: staticPage.staticPageStatisticName,
      translations,
    };
  }

  async getStaticPages(): Promise<StaticPages[]> {
    const data = await this.wordpressService.executeGraphQLQuery(`
      query {
        staticPages(where: {language: ${FRENCH_CODE}}) {
          nodes {
            databaseId
            staticPageTitle
            staticPageContent
            staticPageLinkIcon
            staticPageIconSvgLight
            staticPageIconSvgDark
            staticPageStatisticName
            staticPagePosition
            translations {
              databaseId
              language {
                code
                name
                locale
              }
              staticPageTitle
              staticPageContent
            }
          }
        }
      }
    `);
    return data.staticPages.nodes.map(this.mapToMultiModel);
  }

  async getStaticPage(id: number): Promise<StaticPages> {
    const data = await this.wordpressService.executeGraphQLQuery(`
      query {
        staticPage(id: ${id}, idType: DATABASE_ID) {
          databaseId
          staticPageTitle
          staticPageContent
          staticPageLinkIcon
          staticPageIconSvgLight
          staticPageIconSvgDark
          staticPageStatisticName
          staticPagePosition
          translations {
            databaseId
            language {
              code
              name
              locale
            }
            staticPageTitle
            staticPageContent
          }
        }
      }
    `);
    return this.mapToMultiModel(data.staticPage);
  }
}
