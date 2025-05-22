import { Field, ObjectType } from '@nestjs/graphql';
import { LoginTranslationsDirectus } from '@directus/collections/translations/translations.directus.model';

@ObjectType()
export class LoginDirectus {
  @Field()
  id: number;

  @Field(() => [LoginTranslationsDirectus])
  translations: LoginTranslationsDirectus[];
}
