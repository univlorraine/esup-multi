import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType({ isAbstract: true })
export class BaseTranslations {
  @Field({ nullable: true })
  languagesCode: string;
}

@ObjectType()
export class ChannelsTranslations extends BaseTranslations {
  @Field({ nullable: true })
  label: string;
}

@ObjectType()
export class ContactUsTranslations extends BaseTranslations {
  @Field({ nullable: true })
  content: string;

  @Field({ nullable: true })
  title: string;
}

@ObjectType()
export class FeaturesTranslations extends BaseTranslations {
  @Field(() => [String], { nullable: true })
  searchKeywords: string[];

  @Field({ nullable: true })
  shortTitle: string;

  @Field({ nullable: true })
  title: string;
}

@ObjectType()
export class ImportantNewsTranslations extends BaseTranslations {
  @Field({ nullable: true })
  title: string;

  @Field({ nullable: true })
  content: string;

  @Field({ nullable: true })
  buttonLabel: string;
}

@ObjectType()
export class LoginTranslations extends BaseTranslations {
  @Field({ nullable: true })
  notAuthenticatedText: string;

  @Field({ nullable: true })
  connectionText: string;
}

@ObjectType()
export class StaticPagesTranslations extends BaseTranslations {
  @Field({ nullable: true })
  content: string;

  @Field({ nullable: true })
  title: string;
}

@ObjectType()
export class WidgetsTranslations extends BaseTranslations {
  @Field({ nullable: true })
  content: string;

  @Field({ nullable: true })
  title: string;
}
