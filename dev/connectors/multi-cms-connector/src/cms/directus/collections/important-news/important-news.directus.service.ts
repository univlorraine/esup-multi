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
import { ImportantNewsDirectus } from '@directus/collections/important-news/important-news.directus.model';
import { ImportantNews } from '@common/models/important-news.model';
import { DirectusService } from '@directus/directus.service';
import { OnEvent } from '@nestjs/event-emitter';
import { ValidateMapping } from '@common/decorators/validate-mapping.decorator';
import { ImportantNewsSchema } from '@common/validation/schemas/important-news.schema';
import { normalizeEmptyStringToNull } from '@common/utils/normalize';
import { CacheService } from '@cache/cache.service';
import { CacheCollection } from '@cache/cache.config';

@Injectable()
export class ImportantNewsDirectusService {
  private readonly logger = new Logger(ImportantNewsDirectusService.name);
  constructor(
    private readonly directusService: DirectusService,
    private readonly cacheService: CacheService,
  ) {}

  @OnEvent('directus.important-news.cache.cleared')
  async handleCacheCleared() {
    this.logger.log('Received cache cleared event - preloading data...');
    try {
      await this.preloadData();
    } catch (error) {
      this.logger.error(
        'Failed to preload important-news after cache clear:',
        error.message,
      );
    }
  }

  public async preloadData() {
    this.logger.log('Preloading important-news...');
    await this.getImportantNews();
    this.logger.log('Important-news preloaded successfully');
  }

  @ValidateMapping({ schema: ImportantNewsSchema })
  private mapToMultiModel(importantNew: ImportantNewsDirectus): ImportantNews {
    return {
      id: importantNew.id.toString(),
      authorization: importantNew.authorization
        ? {
            type: importantNew.authorization.type,
            roles: importantNew.authorization.roles,
          }
        : null,
      color: normalizeEmptyStringToNull(importantNew.color),
      image: importantNew.image
        ? this.directusService.buildAssetUrl(importantNew.image.id.toString())
        : null,
      link: normalizeEmptyStringToNull(importantNew.link),
      position: importantNew.sort || 0,
      statisticName: normalizeEmptyStringToNull(importantNew.statisticName),
      translations: importantNew.translations.map((translation) => ({
        languagesCode: translation.languages_code.code,
        title: translation.title,
        content: translation.content,
        buttonLabel: normalizeEmptyStringToNull(translation.buttonLabel),
      })),
    };
  }

  async getImportantNews(): Promise<ImportantNews[]> {
    return this.cacheService.getOrFetchWithLock(
      CacheCollection.IMPORTANT_NEWS,
      () => this.loadImportantNewsFromDirectus(),
    );
  }

  private async loadImportantNewsFromDirectus(): Promise<ImportantNews[]> {
    this.logger.debug('Loading important news from Directus...');
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
    return data.important_news.map((item) => this.mapToMultiModel(item));
  }

  async getImportantNew(id: number): Promise<ImportantNews> {
    return this.cacheService.getOrFetchWithLock(
      CacheCollection.IMPORTANT_NEWS,
      () => this.loadImportantNewFromDirectus(id),
      id,
    );
  }

  private async loadImportantNewFromDirectus(
    id: number,
  ): Promise<ImportantNews> {
    this.logger.debug(`Loading important new ${id} from Directus...`);
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
