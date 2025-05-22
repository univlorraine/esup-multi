import { Field, ObjectType } from '@nestjs/graphql';
import { RolesWordpress } from '@wordpress/collections/roles/roles.wordpress.model';
import { PositionsByRoleWordpress } from '@wordpress/collections/positions-by-role/positions-by-role.wordpress.model';
import { WidgetsTranslationsWordpress } from '@wordpress/collections/translations/translations.wordpress.model';

@ObjectType()
export class WidgetsWordpress {
  @Field()
  databaseId: number;

  @Field({ nullable: true })
  widgetTitle?: string;

  @Field({ nullable: true })
  widgetDescription?: string;

  @Field({ nullable: true })
  widgetContent?: string;

  @Field()
  widgetCode: string;

  @Field({ nullable: true })
  widgetIcon?: string;

  @Field({ nullable: true })
  widgetIconSvgLight?: string;

  @Field({ nullable: true })
  widgetIconSvgDark?: string;

  @Field()
  widgetAccessRestriction: 'ALLOW' | 'DISALLOW' | 'NONE';

  @Field(() => WidgetsRolesConnection, { nullable: true })
  widgetRoles?: WidgetsRolesConnection;

  @Field()
  widgetPosition: number;

  @Field(() => WidgetsPositionsByRoleConnection, { nullable: true })
  widgetPositionsByRole?: WidgetsPositionsByRoleConnection;

  @Field()
  widgetType: 'internal' | 'external';

  @Field({ nullable: true })
  widgetRouterLink?: string;

  @Field({ nullable: true })
  widgetLinkUrl?: string;

  @Field({ nullable: true })
  widgetSsoService?: string;

  @Field({ nullable: true })
  widgetColor?: string;

  @Field({ nullable: true })
  widgetStatisticName?: string;

  @Field(() => [WidgetsTranslationsWordpress])
  translations: WidgetsTranslationsWordpress[];
}

@ObjectType()
class WidgetsRolesConnection {
  @Field(() => [RolesWordpress])
  nodes: RolesWordpress[];
}

@ObjectType()
class WidgetsPositionsByRoleConnection {
  @Field(() => [PositionsByRoleWordpress])
  nodes: PositionsByRoleWordpress[];
}
