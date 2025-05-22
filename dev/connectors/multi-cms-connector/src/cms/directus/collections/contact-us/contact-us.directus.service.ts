import { Injectable } from '@nestjs/common';
import { ContactUsDirectus } from '@directus/collections/contact-us/contact-us.directus.model';
import { ContactUs } from '@common/models/contact-us.model';
import { DirectusService } from '@directus/directus.service';

@Injectable()
export class ContactUsDirectusService {
  constructor(private readonly directusService: DirectusService) {}

  private mapToMultiModel(contactUs: ContactUsDirectus): ContactUs {
    return {
      icon: contactUs.icon,
      to: contactUs.to,
      translations: contactUs.translations.map((translation) => ({
        id: translation.id,
        languagesCode: translation.languages_code.code,
        content: translation.content,
        title: translation.title,
      })),
    };
  }

  async getContactUs(): Promise<ContactUs> {
    const data = await this.directusService.executeGraphQLQuery(`
      query {
        contact_us {
          id
          to
          icon
          translations {
              id
              title
              content
              languages_code {
                  name
                  direction
                  code
              }
          }
        }
      }
    `);
    return this.mapToMultiModel(data.contact_us);
  }
}
