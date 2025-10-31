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
import { ContactUsWordpress } from '@wordpress/collections/contact-us/contact-us.wordpress.model';
import { ContactUs } from '@common/models/contact-us.model';
import { WordpressService } from '@wordpress/wordpress.service';
import { ContactUsTranslations } from '@common/models/translations.model';
import { ContactUsTranslationsWordpress } from '@wordpress/collections/translations/translations.wordpress.model';
import { OnEvent } from '@nestjs/event-emitter';
import { ValidateMapping } from '@common/decorators/validate-mapping.decorator';
import { ContactUsSchema } from '@common/validation/schemas/contact-us.schema';
import { normalizeEmptyStringToNull } from '@common/utils/normalize';
import { CacheService } from '@cache/cache.service';
import { CacheCollection } from '@cache/cache.config';

// TODO: Move FRENCH_CODE to .env and rename it to DEFAULT_LANGUAGE_CODE
const FRENCH_CODE = 'FR';
@Injectable()
export class ContactUsWordpressService {
  private readonly logger = new Logger(ContactUsWordpressService.name);
  constructor(
    private readonly wordpressService: WordpressService,
    private readonly cacheService: CacheService,
  ) {}

  @OnEvent('wordpress.contact-us.cache.cleared')
  async handleCacheCleared() {
    this.logger.log('Received cache cleared event - preloading data...');
    try {
      await this.preloadData();
    } catch (error) {
      this.logger.error(
        'Failed to preload contact-us after cache clear:',
        error.message,
      );
    }
  }

  public async preloadData() {
    this.logger.log('Preloading contact-us...');
    await this.getContactUs();
    this.logger.log('Contact-us preloaded successfully');
  }

  @ValidateMapping({ schema: ContactUsSchema })
  private mapToMultiModel(contactUs: ContactUsWordpress): ContactUs {
    const frTranslation: ContactUsTranslations = {
      languagesCode: FRENCH_CODE.toLowerCase(),
      content: contactUs.contactUsContent,
      title: contactUs.contactUsTitle,
    };

    const translations: ContactUsTranslations[] = [
      frTranslation,
      ...(contactUs.translations.map(
        (translation: ContactUsTranslationsWordpress) => ({
          languagesCode: translation.language.code.toLowerCase(),
          content: translation.contactUsContent,
          title: translation.contactUsTitle,
        }),
      ) || []),
    ];

    return {
      icon: normalizeEmptyStringToNull(contactUs.contactUsIcon),
      to: contactUs.contactUsTo,
      translations,
    };
  }

  async getContactUs(): Promise<ContactUs> {
    return this.cacheService.getOrFetchWithLock(
      CacheCollection.CONTACT_US,
      () => this.loadContactUsFromWordpress(),
    );
  }

  private async loadContactUsFromWordpress(): Promise<ContactUs> {
    this.logger.debug('Loading contact-us from WordPress...');
    const data = await this.wordpressService.executeGraphQLQuery(`
      query {
        contactUs(where: {language: ${FRENCH_CODE}}) {
          nodes {
            databaseId
            contactUsTitle
            contactUsContent
            contactUsTo
            contactUsIcon
            translations {
              databaseId
              language {
                code
                locale
                name
              }
              contactUsContent
              contactUsTitle
            }
          }
        }
      }
    `);
    return this.mapToMultiModel(data.contactUs.nodes[0]);
  }
}
