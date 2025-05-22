import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class Authorization {
  @Field({ nullable: true })
  type: string;

  @Field(() => [String], { nullable: true })
  roles: string[];
}
