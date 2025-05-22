import { Query, Resolver } from '@nestjs/graphql';
import { ContactUsWordpressService } from './contact-us.wordpress.service';
import { ContactUs } from '@common/models/contact-us.model';

@Resolver(() => ContactUs)
export class ContactUsWordpressResolver {
  constructor(private readonly contactUsService: ContactUsWordpressService) {}

  // Définition de la requête GraphQL qui sera exécutée depuis le backend de Multi
  @Query(() => ContactUs, { name: 'contactUs' })
  async getContactUs(): Promise<ContactUs> {
    return this.contactUsService.getContactUs();
  }
}
