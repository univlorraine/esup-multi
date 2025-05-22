import { Field, ObjectType } from '@nestjs/graphql';
import { LoginTranslationsWordpress } from '@wordpress/collections/translations/translations.wordpress.model';

@ObjectType()
export class LoginWordpress {
  @Field()
  databaseId: number;

  @Field({ nullable: true })
  loginConnectionText?: string;

  @Field({ nullable: true })
  loginNotAuthenticatedText?: string;

  @Field(() => [LoginTranslationsWordpress])
  translations: LoginTranslationsWordpress[];
}
