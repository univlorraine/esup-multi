import { Field, ObjectType } from '@nestjs/graphql';
import { PagesTranslationsDirectus } from '@directus/collections/translations/translations.directus.model';

@ObjectType()
export class PagesDirectus {
  @Field()
  id: number;

  @Field()
  status: string;

  @Field()
  icon: string;

  @Field()
  iconSourceSvgDarkTheme: string;

  @Field()
  iconSourceSvgLightTheme: string;

  @Field()
  sort: number;

  @Field()
  statisticName: string;

  @Field(() => [PagesTranslationsDirectus])
  translations: PagesTranslationsDirectus[];
}
