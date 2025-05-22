import { Field, ObjectType } from '@nestjs/graphql';
import { ContactUsTranslationsWordpress } from '@wordpress/collections/translations/translations.wordpress.model';

@ObjectType()
export class ContactUsWordpress {
  @Field()
  databaseId: number;

  @Field()
  contactUsTitle: string;

  @Field()
  contactUsContent: string;

  @Field()
  contactUsTo: string;

  @Field()
  contactUsIcon: string;

  @Field(() => [ContactUsTranslationsWordpress])
  translations: ContactUsTranslationsWordpress[];
}
