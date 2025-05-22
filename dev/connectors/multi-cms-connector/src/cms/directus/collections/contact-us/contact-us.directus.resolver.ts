import { Query, Resolver } from '@nestjs/graphql';
import { ContactUsDirectusService } from './contact-us.directus.service';
import { ContactUs } from '@common/models/contact-us.model';


@Resolver(() => ContactUs)
export class ContactUsDirectusResolver {
  constructor(private readonly contactUsService: ContactUsDirectusService) {}

  // Définition de la requête GraphQL qui sera exécutée depuis le backend de Multi
  @Query(() => ContactUs, { name: 'contactUs' })
  async getContactUs(): Promise<ContactUs> {
    return this.contactUsService.getContactUs();
  }
}
