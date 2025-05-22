import { Field, ObjectType } from '@nestjs/graphql';
import { AuthorizationDirectus } from '@directus/collections/authorization/authorization.directus.model';
import { SettingsByRoleDirectus } from '@directus/collections/settings-by-role/settings-by-role.directus.model';
import { WidgetsTranslationsDirectus } from '@directus/collections/translations/translations.directus.model';

@ObjectType()
export class WidgetsDirectus {
  @Field()
  id: number;

  @Field()
  color: string;

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
  type: string;

  @Field()
  widget: string;

  @Field(() => [WidgetsTranslationsDirectus])
  translations: WidgetsTranslationsDirectus[];

  @Field(() => AuthorizationDirectus)
  authorization: AuthorizationDirectus;

  @Field(() => [SettingsByRoleDirectus])
  settings_by_role: SettingsByRoleDirectus[];
}
