import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class SocialNetworksDirectus {
  @Field()
  id: number;

  @Field()
  icon: string;

  @Field()
  link: string;

  @Field()
  title: string;

  @Field()
  sort: number;
}
