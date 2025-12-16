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
import { StaticPagesWordpress } from '@wordpress/collections/static-pages/static-pages.wordpress.model';
import { StaticPages } from '@common/models/static-pages.model';
import { WordpressService } from '@wordpress/wordpress.service';
import { StaticPagesTranslations } from '@common/models/translations.model';
import { StaticPagesTranslationsWordpress } from '@wordpress/collections/translations/translations.wordpress.model';
import { OnEvent } from '@nestjs/event-emitter';
import { ValidateMapping } from '@common/decorators/validate-mapping.decorator';
import { StaticPagesSchema } from '@common/validation/schemas/static-pages.schema';
import { normalizeEmptyStringToNull } from '@common/utils/normalize';
import { CacheService } from '@cache/cache.service';
import { CacheCollection } from '@cache/cache.config';

// TODO: Move FRENCH_CODE to .env and rename it to DEFAULT_LANGUAGE_CODE
const FRENCH_CODE = 'FR';

@Injectable()
export class StaticPagesWordpressService {
  private readonly logger = new Logger(StaticPagesWordpressService.name);
  constructor(
    private readonly wordpressService: WordpressService,
    private readonly cacheService: CacheService,
  ) {}

  @OnEvent('wordpress.static-pages.cache.cleared')
  async handleCacheCleared() {
    this.logger.log('Received cache cleared event - preloading data...');
    try {
      await this.preloadData();
    } catch (error) {
      this.logger.error(
        'Failed to preload static-pages after cache clear:',
        error.message,
      );
    }
  }

  public async preloadData() {
    this.logger.log('Preloading static-pages...');
    await this.getStaticPages();
    this.logger.log('Static-pages preloaded successfully');
  }

  @ValidateMapping({ schema: StaticPagesSchema })
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
          languagesCode: translation.language.code.toLowerCase(),
          title: translation.staticPageTitle,
          content: translation.staticPageContent,
        }),
      ) || []),
    ];

    return {
      id: staticPage.databaseId.toString(),
      icon: normalizeEmptyStringToNull(staticPage.staticPageLinkIcon),
      iconSvgDark: normalizeEmptyStringToNull(staticPage.staticPageIconSvgDark),
      iconSvgLight: normalizeEmptyStringToNull(
        staticPage.staticPageIconSvgLight,
      ),
      position: staticPage.staticPagePosition || 0,
      statisticName: normalizeEmptyStringToNull(
        staticPage.staticPageStatisticName,
      ),
      translations,
    };
  }

  async getStaticPages(): Promise<StaticPages[]> {
    return this.cacheService.getOrFetchWithLock(
      CacheCollection.STATIC_PAGES,
      () => this.loadStaticPagesFromWordpress(),
    );
  }

  private async loadStaticPagesFromWordpress(): Promise<StaticPages[]> {
    this.logger.debug('Loading static pages from WordPress...');
    const data = await this.wordpressService.executeGraphQLQuery(`
      query {
        staticPages(first: 100, where: {language: ${FRENCH_CODE}}) {
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
    return this.cacheService.getOrFetchWithLock(
      CacheCollection.STATIC_PAGES,
      () => this.loadStaticPageFromWordpress(id),
      id,
    );
  }

  private async loadStaticPageFromWordpress(id: number): Promise<StaticPages> {
    this.logger.debug(`Loading static page ${id} from WordPress...`);
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
