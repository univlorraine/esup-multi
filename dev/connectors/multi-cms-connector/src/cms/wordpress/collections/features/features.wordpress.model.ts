import { Field, ObjectType } from '@nestjs/graphql';
import { RolesWordpress } from '@wordpress/collections/roles/roles.wordpress.model';
import { FeaturesTranslationsWordpress } from '@wordpress/collections/translations/translations.wordpress.model';
import { PositionsByRoleWordpress } from '@wordpress/collections/positions-by-role/positions-by-role.wordpress.model';

@ObjectType()
export class FeaturesWordpress {
  @Field()
  databaseId: number;

  @Field()
  featureTitle: string;

  @Field({ nullable: true })
  featureShortTitle?: string;

  @Field({ nullable: true })
  featureSearchKeywords?: string;

  @Field({ nullable: true })
  featureDescription?: string;

  @Field({ nullable: true })
  featureIcon?: string;

  @Field({ nullable: true })
  featureIconSvgLight?: string;

  @Field({ nullable: true })
  featureIconSvgDark?: string;

  @Field()
  featureMenu: string;

  @Field()
  featureAccessRestriction: 'ALLOW' | 'DISALLOW' | 'NONE';

  @Field(() => FeaturesRolesConnection, { nullable: true })
  featureRoles?: FeaturesRolesConnection;

  @Field()
  featurePosition: number;

  @Field(() => FeaturesPositionsByRoleConnection, { nullable: true })
  featurePositionsByRole?: FeaturesPositionsByRoleConnection;

  @Field()
  featureType: 'internal' | 'external';

  @Field({ nullable: true })
  featureRouterLink?: string;

  @Field({ nullable: true })
  featureLinkUrl?: string;

  @Field({ nullable: true })
  featureSsoService?: string;

  @Field({ nullable: true })
  featureStatisticName?: string;

  @Field(() => [FeaturesTranslationsWordpress])
  translations: FeaturesTranslationsWordpress[];
}

@ObjectType()
class FeaturesRolesConnection {
  @Field(() => [RolesWordpress])
  nodes: RolesWordpress[];
}

@ObjectType()
class FeaturesPositionsByRoleConnection {
  @Field(() => [PositionsByRoleWordpress])
  nodes: PositionsByRoleWordpress[];
}
