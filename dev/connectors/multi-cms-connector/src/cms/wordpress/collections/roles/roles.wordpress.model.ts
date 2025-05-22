import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class RolesWordpress {
  @Field()
  databaseId: number;

  @Field()
  roleCode: string;

  @Field({ nullable: true })
  roleDescription?: string;
}
