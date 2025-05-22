import { Field, ObjectType } from '@nestjs/graphql';
import { RolesWordpress } from '@wordpress/collections/roles/roles.wordpress.model';

@ObjectType()
export class PositionsByRoleWordpress {
  @Field()
  databaseId: number;

  @Field()
  positionByRolePosition: number;

  @Field(() => PositionByRoleRoleConnection)
  positionByRoleRole: PositionByRoleRoleConnection;
}

@ObjectType()
class PositionByRoleRoleConnection {
  @Field(() => [RolesWordpress])
  node: RolesWordpress;
}
