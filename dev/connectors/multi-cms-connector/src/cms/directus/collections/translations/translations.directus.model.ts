import { Field, ObjectType } from '@nestjs/graphql';
import { LanguagesDirectus } from '@directus/collections/languages/languages.directus.model';

@ObjectType({ isAbstract: true })
export class BaseTranslationsDirectus {
  @Field()
  id: number;

  @Field()
  languages_code: LanguagesDirectus;
}

@ObjectType()
export class ChannelsTranslationsDirectus extends BaseTranslationsDirectus {
  @Field()
  label: string;
}

@ObjectType()
export class ContactUsTranslationsDirectus extends BaseTranslationsDirectus {
  @Field()
  content: string;

  @Field()
  title: string;
}

@ObjectType()
export class FeaturesTranslationsDirectus extends BaseTranslationsDirectus {
  @Field(() => [String])
  searchKeywords: string[];

  @Field()
  shortTitle: string;

  @Field()
  title: string;
}

@ObjectType()
export class ImportantNewsTranslationsDirectus extends BaseTranslationsDirectus {
  @Field()
  buttonLabel: string;

  @Field()
  content: string;

  @Field()
  title: string;
}

@ObjectType()
export class LoginTranslationsDirectus extends BaseTranslationsDirectus {
  @Field()
  connexion_text: string;

  @Field()
  not_authenticated_text: string;
}

@ObjectType()
export class PagesTranslationsDirectus extends BaseTranslationsDirectus {
  @Field()
  content: string;

  @Field()
  title: string;
}

@ObjectType()
export class WidgetsTranslationsDirectus extends BaseTranslationsDirectus {
  @Field()
  content: string;

  @Field()
  title: string;
}
