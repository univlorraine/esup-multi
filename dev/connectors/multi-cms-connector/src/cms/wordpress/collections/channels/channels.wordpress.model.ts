import { Field, ObjectType } from '@nestjs/graphql';
import { ChannelsTranslationsWordpress } from '@wordpress/collections/translations/translations.wordpress.model';

@ObjectType()
export class ChannelsWordpress {
  @Field()
  databaseId: number;

  @Field()
  channelCode: string;

  @Field()
  channelLabel: string;

  @Field()
  channelColor: string;

  @Field()
  channelIcon: string;

  @Field()
  channelRouterLink: string;

  @Field()
  channelFilterable: boolean;

  @Field(() => [ChannelsTranslationsWordpress])
  translations: ChannelsTranslationsWordpress[];
}
