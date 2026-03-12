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

import { Injectable, Logger } from '@nestjs/common';
import { WordpressService } from '@wordpress/wordpress.service';
import { KnowledgeBaseTranslations } from '@common/models/translations.model';
import { KnowledgeBaseTranslationsWordpress } from '@wordpress/collections/translations/translations.wordpress.model';
import { ValidateMapping } from '@common/decorators/validate-mapping.decorator';
import { KnowledgeBaseSchema } from '@common/validation/schemas/knowledge-base.schema';
import { normalizeEmptyStringToNull } from '@common/utils/normalize';
import { KnowledgeBaseWordpress } from '@wordpress/collections/knowledge-base/knowledge-base.wordpress.model';
import { KnowledgeBase } from '@common/models/knowledge-base.model';
import { CacheCollection } from '@cache/cache.config';
import { CacheService } from '@cache/cache.service';
import { OnEvent } from '@nestjs/event-emitter';

// TODO: Move FRENCH_CODE to .env and rename it to DEFAULT_LANGUAGE_CODE
const FRENCH_CODE = 'FR';

@Injectable()
export class KnowledgeBaseWordpressService {
  private readonly logger = new Logger(KnowledgeBaseWordpressService.name);
  constructor(
    private readonly wordpressService: WordpressService,
    private readonly cacheService: CacheService,
  ) {}

  @OnEvent('wordpress.knowledge-base.cache.cleared')
  async handleCacheCleared() {
    this.logger.log('Received cache cleared event - preloading data...');
    try {
      await this.preloadData();
    } catch (error) {
      this.logger.error(
        'Failed to preload knowledge-base after cache clear:',
        error.message,
      );
    }
  }

  public async preloadData() {
    this.logger.log('Preloading knowledge-base...');
    await this.getKnowledgeBase();
    this.logger.log('knowledge-base preloaded successfully');
  }

  @ValidateMapping({ schema: KnowledgeBaseSchema })
  private mapToMultiModel(
    knowledgeBase: KnowledgeBaseWordpress,
  ): KnowledgeBase {
    const frTranslation: KnowledgeBaseTranslations = {
      languagesCode: FRENCH_CODE.toLowerCase(),
      title: knowledgeBase.knowledgeBaseTitle,
      content: knowledgeBase.knowledgeBaseContent,
      searchKeywords:
        knowledgeBase.knowledgeBaseSearchKeywords &&
        knowledgeBase.knowledgeBaseSearchKeywords?.trim() !== ''
          ? knowledgeBase.knowledgeBaseSearchKeywords
              .split(',')
              .filter((keyword) => keyword.trim() !== '')
          : null,
    };

    const translations: KnowledgeBaseTranslations[] = [
      frTranslation,
      ...(knowledgeBase.translations?.map(
        (translation: KnowledgeBaseTranslationsWordpress) => ({
          languagesCode: translation.language.code.toLowerCase(),
          title: translation.knowledgeBaseTitle,
          content: translation.knowledgeBaseContent,
          searchKeywords:
            translation.knowledgeBaseSearchKeywords &&
            translation.knowledgeBaseSearchKeywords?.trim() !== ''
              ? translation.knowledgeBaseSearchKeywords
                  .split(',')
                  .filter((keyword) => keyword.trim() !== '')
              : null,
        }),
      ) || []),
    ];

    const roles =
      knowledgeBase.knowledgeBaseRoles?.nodes.length > 0
        ? knowledgeBase.knowledgeBaseRoles.nodes.map((role) => role.roleCode)
        : [];

    return {
      id: knowledgeBase.databaseId.toString(),
      type: knowledgeBase.knowledgeBaseType,
      childDisplay: knowledgeBase.knowledgeBaseChildDisplay || null,
      routerLink: normalizeEmptyStringToNull(
        knowledgeBase.knowledgeBaseRouterLink,
      ),
      link: normalizeEmptyStringToNull(knowledgeBase.knowledgeBaseUrlLink),
      ssoService: normalizeEmptyStringToNull(
        knowledgeBase.knowledgeBaseSsoService,
      ),
      position: knowledgeBase.knowledgeBasePosition || 0,
      authorization:
        knowledgeBase.knowledgeBaseAccessRestriction &&
        knowledgeBase.knowledgeBaseAccessRestriction !== 'NONE'
          ? {
              type: knowledgeBase.knowledgeBaseAccessRestriction,
              roles,
            }
          : null,
      translations,
      parentId:
        knowledgeBase.knowledgeBaseParent?.node?.databaseId?.toString() || null,
      coverImage: normalizeEmptyStringToNull(
        knowledgeBase.knowledgeBaseCoverImage?.node.mediaItemUrl.toString(),
      ),
      phone: normalizeEmptyStringToNull(knowledgeBase.knowledgeBasePhone),
      address: normalizeEmptyStringToNull(knowledgeBase.knowledgeBaseAddress),
      email: normalizeEmptyStringToNull(knowledgeBase.knowledgeBaseEmail),
    };
  }

  async getKnowledgeBase(): Promise<KnowledgeBase[]> {
    return this.cacheService.getOrFetchWithLock(
      CacheCollection.KNOWLEDGE_BASE,
      () => this.loadKnowledgeBaseFromWordPress(),
    );
  }

  private async loadKnowledgeBaseFromWordPress(): Promise<KnowledgeBase[]> {
    this.logger.debug('Loading knowledge-base from WordPress...');
    const data = await this.wordpressService.executeGraphQLQuery(`
      query {
        knowledgeBases(first: 100, where: {language: ${FRENCH_CODE}}) {
          nodes {
            databaseId
            knowledgeBaseTitle
            knowledgeBaseContent
            knowledgeBaseType
            knowledgeBaseChildDisplay
            knowledgeBaseRouterLink
            knowledgeBaseUrlLink
            knowledgeBaseSsoService
            knowledgeBasePosition
            knowledgeBaseAccessRestriction
            knowledgeBaseRoles(first: 100) {
              nodes {
                databaseId
                roleCode
                roleDescription
              }
            }
            knowledgeBaseSearchKeywords
            knowledgeBasePhone
            knowledgeBaseAddress
            knowledgeBaseEmail
            knowledgeBaseCoverImage {
             node {
                databaseId
                sourceUrl
                mediaItemUrl
                altText
              }
            } 
            knowledgeBaseParent {
              node {
                databaseId
                knowledgeBaseAccessRestriction
                knowledgeBaseRoles(first: 100) {
                  nodes {
                    databaseId
                    roleCode
                    roleDescription
                  }
                }
              }              
            }
            translations {
              databaseId
              language {
                code
                name
                locale
              }
              knowledgeBaseTitle
              knowledgeBaseContent
              knowledgeBaseSearchKeywords
            }
          }
        }
      }
    `);
    return data.knowledgeBases.nodes.map(this.mapToMultiModel.bind(this));
  }
}
