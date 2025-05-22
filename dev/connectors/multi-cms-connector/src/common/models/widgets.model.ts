import { Field, ObjectType } from '@nestjs/graphql';
import { Authorization } from '@common/models/authorization.model';
import { WidgetsTranslations } from '@common/models/translations.model';
import { SettingsByRole } from '@common/models/settings-by-role.model';

@ObjectType()
export class Widgets {
  @Field()
  id: string;

  @Field({ nullable: true })
  description: string;

  @Field({ nullable: true })
  widget: string;

  @Field({ nullable: true })
  icon: string;

  @Field({ nullable: true })
  iconSvgDark: string;

  @Field({ nullable: true })
  iconSvgLight: string;

  @Field({ nullable: true })
  link: string;

  @Field({ nullable: true })
  position: number;

  @Field({ nullable: true })
  ssoService: string;

  @Field({ nullable: true })
  statisticName: string;

  @Field({ nullable: true })
  routerLink: string;

  @Field({ nullable: true })
  color: string;

  @Field({ nullable: true })
  type: string;

  @Field(() => [WidgetsTranslations], { nullable: true })
  translations: WidgetsTranslations[];

  @Field(() => Authorization, { nullable: true })
  authorization: Authorization;

  @Field(() => [SettingsByRole], { nullable: true })
  settingsByRole: SettingsByRole[];
}
