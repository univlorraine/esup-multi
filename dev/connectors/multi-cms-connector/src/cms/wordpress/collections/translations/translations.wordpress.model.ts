import { Field, ObjectType } from '@nestjs/graphql';
import { LanguagesWordpress } from '@wordpress/collections/languages/languages.wordpress.model';

@ObjectType({ isAbstract: true })
export class BaseTranslationsWordpress {
  @Field()
  databaseId: number;

  @Field()
  language: LanguagesWordpress;
}

@ObjectType()
export class ChannelsTranslationsWordpress extends BaseTranslationsWordpress {
  @Field()
  channelLabel: string;
}

@ObjectType()
export class ContactUsTranslationsWordpress extends BaseTranslationsWordpress {
  @Field()
  contactUsTitle: string;

  @Field()
  contactUsContent: string;
}

@ObjectType()
export class FeaturesTranslationsWordpress extends BaseTranslationsWordpress {
  @Field({ nullable: true })
  featureSearchKeywords?: string;

  @Field({ nullable: true })
  featureShortTitle?: string;

  @Field()
  featureTitle: string;
}

@ObjectType()
export class ImportantNewsTranslationsWordpress extends BaseTranslationsWordpress {
  @Field()
  importantNewTitle: string;

  @Field()
  importantNewContent: string;

  @Field({ nullable: true })
  importantNewButtonLabel?: string;
}

@ObjectType()
export class LoginTranslationsWordpress extends BaseTranslationsWordpress {
  @Field({ nullable: true })
  loginConnectionText?: string;

  @Field({ nullable: true })
  loginNotAuthenticatedText?: string;
}

@ObjectType()
export class StaticPagesTranslationsWordpress extends BaseTranslationsWordpress {
  @Field()
  staticPageContent: string;

  @Field()
  staticPageTitle: string;
}

@ObjectType()
export class WidgetsTranslationsWordpress extends BaseTranslationsWordpress {
  @Field({ nullable: true })
  widgetContent?: string;

  @Field({ nullable: true })
  widgetTitle?: string;
}
