import { Injectable } from '@nestjs/common';
import { ImportantNewsWordpress } from '@wordpress/collections/important-news/important-news.wordpress.model';
import { ImportantNews } from '@common/models/important-news.model';
import { WordpressService } from '@wordpress/wordpress.service';
import { ImportantNewsTranslations } from '@common/models/translations.model';
import { ImportantNewsTranslationsWordpress } from '@wordpress/collections/translations/translations.wordpress.model';

const FRENCH_CODE = 'FR';

@Injectable()
export class ImportantNewsWordpressService {
  constructor(private readonly wordpressService: WordpressService) {}

  private mapToMultiModel(importantNew: ImportantNewsWordpress): ImportantNews {
    const frTranslation: ImportantNewsTranslations = {
      languagesCode: FRENCH_CODE.toLowerCase(),
      title: importantNew.importantNewTitle,
      content: importantNew.importantNewContent,
      buttonLabel: importantNew.importantNewButtonLabel,
    };

    const translations: ImportantNewsTranslations[] = [
      frTranslation,
      ...(importantNew.translations?.map(
        (translation: ImportantNewsTranslationsWordpress) => ({
          id: translation.databaseId,
          languagesCode: translation.language.code.toLowerCase(),
          title: translation.importantNewTitle,
          content: translation.importantNewContent,
          buttonLabel: translation.importantNewButtonLabel,
        }),
      ) || []),
    ];

    const roles =
      importantNew.importantNewRoles?.nodes.length > 0
        ? importantNew.importantNewRoles.nodes.map((role) => role.roleCode)
        : null;

    // TODO: vérifier si le sort est bien utile et utilisé côté Directus ou si on peut l'enlever pour les 2 CMS
    return {
      id: importantNew.databaseId.toString(),
      authorization:
        importantNew.importantNewAccessRestriction &&
        importantNew.importantNewAccessRestriction !== 'NONE'
          ? {
              type: importantNew.importantNewAccessRestriction,
              roles,
            }
          : null,
      color: importantNew.importantNewColor,
      image: importantNew.importantNewImage?.node.mediaItemUrl.toString(),
      link: importantNew.importantNewLinkUrl,
      position: null,
      statisticName: importantNew.importantNewStatisticName,
      translations,
    };
  }

  async getImportantNews(): Promise<ImportantNews[]> {
    const data = await this.wordpressService.executeGraphQLQuery(`
      query {
        importantNews(where: {language: ${FRENCH_CODE}}) {
          nodes {
            databaseId
            importantNewTitle
            importantNewContent
            importantNewButtonLabel
            importantNewImage {
              node {
                databaseId
                sourceUrl
                mediaItemUrl
                altText
              }
            }
            importantNewAccessRestriction
            importantNewRoles {
              nodes {
                databaseId
                roleCode
                roleDescription
              }
            }
            importantNewColor
            importantNewLinkUrl
            importantNewStatisticName
            translations {
              databaseId
              importantNewButtonLabel
              importantNewContent
              importantNewTitle
              language {
                code
                locale
                name
              }
            }
          }
        }
      }
    `);
    return data.importantNews.nodes.map(this.mapToMultiModel);
  }

  async getImportantNew(id: number): Promise<ImportantNews> {
    const data = await this.wordpressService.executeGraphQLQuery(`
      query {
        importantNew(id: ${id}, idType: DATABASE_ID) {
          databaseId
          importantNewTitle
          importantNewContent
          importantNewButtonLabel
          importantNewImage {
            node {
              databaseId
              sourceUrl
              mediaItemUrl
              altText
            }
          }
          importantNewAccessRestriction
          importantNewRoles {
            nodes {
              databaseId
              roleCode
              roleDescription
            }
          }
          importantNewColor
          importantNewLinkUrl
          importantNewStatisticName
          translations {
            databaseId
            importantNewButtonLabel
            importantNewContent
            importantNewTitle
            language {
              code
              locale
              name
            }
          }
        }
      }
    `);
    return this.mapToMultiModel(data.importantNew);
  }
}
