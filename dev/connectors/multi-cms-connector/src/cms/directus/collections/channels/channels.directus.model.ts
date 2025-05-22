import { Field, ObjectType } from '@nestjs/graphql';
import { ChannelsTranslationsDirectus } from '@directus/collections/translations/translations.directus.model';

@ObjectType()
export class ChannelsDirectus {
  @Field()
  id: number;

  @Field()
  code: string;

  @Field()
  color: string;

  @Field()
  filterable: boolean;

  @Field()
  icon: string;

  @Field()
  routerLink: string;

  @Field(() => [ChannelsTranslationsDirectus])
  translations: ChannelsTranslationsDirectus[];
}
