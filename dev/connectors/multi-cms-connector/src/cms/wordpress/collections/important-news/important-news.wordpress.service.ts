/*
 * Copyright ou © ou Copr. Université de Lorraine, (2022)
 *
 * Direction du Numérique de l'Université de Lorraine - SIED
 * (dn-mobile-dev@univ-lorraine.fr)
 *
 * Ce logiciel est un programme informatique servant à rendre accessible
 * sur mobile divers services universitaires aux étudiants et aux personnels
 * de l'université.
 *
 * Ce logiciel est régi par la licence CeCILL 2.1, soumise au droit français
 * et respectant les principes de diffusion des logiciels libres. Vous pouvez
 * utiliser, modifier et/ou redistribuer ce programme sous les conditions
 * de la licence CeCILL telle que diffusée par le CEA, le CNRS et INRIA
 * sur le site "http://cecill.info".
 *
 * En contrepartie de l'accessibilité au code source et des droits de copie,
 * de modification et de redistribution accordés par cette licence, il n'est
 * offert aux utilisateurs qu'une garantie limitée. Pour les mêmes raisons,
 * seule une responsabilité restreinte pèse sur l'auteur du programme, le
 * titulaire des droits patrimoniaux et les concédants successifs.
 *
 * À cet égard, l'attention de l'utilisateur est attirée sur les risques
 * associés au chargement, à l'utilisation, à la modification et/ou au
 * développement et à la reproduction du logiciel par l'utilisateur étant
 * donné sa spécificité de logiciel libre, qui peut le rendre complexe à
 * manipuler et qui le réserve donc à des développeurs et des professionnels
 * avertis possédant des connaissances informatiques approfondies. Les
 * utilisateurs sont donc invités à charger et à tester l'adéquation du
 * logiciel à leurs besoins dans des conditions permettant d'assurer la
 * sécurité de leurs systèmes et/ou de leurs données et, plus généralement,
 * à l'utiliser et à l'exploiter dans les mêmes conditions de sécurité.
 *
 * Le fait que vous puissiez accéder à cet en-tête signifie que vous avez
 * pris connaissance de la licence CeCILL 2.1, et que vous en avez accepté les
 * termes.
 */

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
