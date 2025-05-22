import { Injectable } from '@nestjs/common';
import { ContactUsWordpress } from '@wordpress/collections/contact-us/contact-us.wordpress.model';
import { ContactUs } from '@common/models/contact-us.model';
import { WordpressService } from '@wordpress/wordpress.service';
import { ContactUsTranslations } from '@common/models/translations.model';
import { ContactUsTranslationsWordpress } from '@wordpress/collections/translations/translations.wordpress.model';

const FRENCH_CODE = 'FR';
@Injectable()
export class ContactUsWordpressService {
  constructor(private readonly wordpressService: WordpressService) {}

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
          id: translation.databaseId,
          languagesCode: translation.language.code.toLowerCase(),
          content: translation.contactUsContent,
          title: translation.contactUsTitle,
        }),
      ) || []),
    ];

    return {
      icon: contactUs.contactUsIcon,
      to: contactUs.contactUsTo,
      translations,
    };
  }

  async getContactUs(): Promise<ContactUs> {
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
