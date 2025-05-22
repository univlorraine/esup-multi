import { Field, ObjectType } from '@nestjs/graphql';
import { StaticPagesTranslationsWordpress } from '@wordpress/collections/translations/translations.wordpress.model';

@ObjectType()
export class StaticPagesWordpress {
  @Field()
  databaseId: number;

  @Field()
  staticPageTitle: string;

  @Field()
  staticPageContent: string;

  @Field({ nullable: true })
  staticPageLinkIcon?: string;

  @Field({ nullable: true })
  staticPageIconSvgLight?: string;

  @Field({ nullable: true })
  staticPageIconSvgDark?: string;

  @Field({ nullable: true })
  staticPageStatisticName?: string;

  @Field()
  staticPagePosition: number;

  @Field(() => [StaticPagesTranslationsWordpress])
  translations: StaticPagesTranslationsWordpress[];
}
