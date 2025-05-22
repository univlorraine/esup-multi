import { Field, ObjectType } from '@nestjs/graphql';
import { AuthorizationDirectus } from '@directus/collections/authorization/authorization.directus.model';
import { ImportantNewsTranslationsDirectus } from '@directus/collections/translations/translations.directus.model';
import { FileDirectus } from '@directus/collections/system/file.directus.model';

@ObjectType()
export class ImportantNewsDirectus {
  @Field()
  id: number;

  @Field(() => AuthorizationDirectus)
  authorization: AuthorizationDirectus;

  @Field()
  color: string;

  @Field()
  image: FileDirectus;

  @Field()
  link: string;

  @Field()
  sort: number;

  @Field()
  statisticName: string;

  @Field()
  status: string;

  @Field(() => [ImportantNewsTranslationsDirectus])
  translations: ImportantNewsTranslationsDirectus[];
}
