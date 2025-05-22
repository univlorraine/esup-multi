import { Field, ObjectType } from '@nestjs/graphql';
import { SettingsByRole } from '@common/models/settings-by-role.model';
import { Authorization } from '@common/models/authorization.model';
import { FeaturesTranslations } from '@common/models/translations.model';

@ObjectType()
export class Features {
  @Field()
  id: string;

  @Field({ nullable: true })
  description: string;

  @Field({ nullable: true })
  icon: string;

  @Field({ nullable: true })
  iconSvgDark: string;

  @Field({ nullable: true })
  iconSvgLight: string;

  @Field({ nullable: true })
  link: string;

  @Field({ nullable: true })
  menu: string;

  @Field({ nullable: true })
  position: number;

  @Field({ nullable: true })
  routerLink: string;

  @Field({ nullable: true })
  ssoService: string;

  @Field({ nullable: true })
  statisticName: string;

  @Field()
  type: 'internal' | 'external';

  @Field(() => [FeaturesTranslations], { nullable: true })
  translations: FeaturesTranslations[];

  @Field(() => Authorization, { nullable: true })
  authorization: Authorization;

  @Field(() => [SettingsByRole], { nullable: true })
  settingsByRole: SettingsByRole[];
}
