import { Field, ObjectType } from '@nestjs/graphql';
import { ContactUsTranslationsDirectus } from '@directus/collections/translations/translations.directus.model';

@ObjectType()
export class ContactUsDirectus {
  @Field()
  id: number;

  @Field()
  to: string;

  @Field()
  icon: string;

  @Field(() => [ContactUsTranslationsDirectus])
  translations: ContactUsTranslationsDirectus[];
}
