import { Field, ObjectType } from '@nestjs/graphql';
import { FeaturesTranslationsDirectus } from '@directus/collections/translations/translations.directus.model';
import { AuthorizationDirectus } from '@directus/collections/authorization/authorization.directus.model';
import { SettingsByRoleDirectus } from '@directus/collections/settings-by-role/settings-by-role.directus.model';

@ObjectType()
export class FeaturesDirectus {
  @Field()
  id: number;

  @Field()
  description: string;

  @Field()
  icon: string;

  @Field()
  iconSourceSvgDarkTheme: string;

  @Field()
  iconSourceSvgLightTheme: string;

  @Field()
  link: string;

  @Field()
  menu: string;

  @Field()
  position: number;

  @Field()
  routerLink: string;

  @Field()
  ssoService: string;

  @Field()
  statisticName: string;

  @Field()
  status: string;

  @Field()
  type: 'internal' | 'external';

  @Field(() => [FeaturesTranslationsDirectus])
  translations: FeaturesTranslationsDirectus[];

  @Field(() => AuthorizationDirectus)
  authorization: AuthorizationDirectus;

  @Field(() => [SettingsByRoleDirectus])
  settings_by_role: SettingsByRoleDirectus[];
}
