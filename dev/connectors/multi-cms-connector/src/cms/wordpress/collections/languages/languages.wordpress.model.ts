import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class LanguagesWordpress {
  @Field()
  code: string;

  @Field()
  locale: string;

  @Field()
  name: string;
}
