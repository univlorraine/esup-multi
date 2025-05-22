import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class AuthorizationDirectus {
  @Field()
  id: number;

  @Field()
  roles: string[];

  @Field()
  type: string;
}
