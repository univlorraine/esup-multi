import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class LanguagesDirectus {
  @Field()
  code: string;

  @Field()
  direction: string;

  @Field()
  name: string;
}
