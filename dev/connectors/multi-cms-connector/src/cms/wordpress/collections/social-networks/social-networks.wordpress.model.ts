import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class SocialNetworksWordpress {
  @Field()
  databaseId: number;

  @Field()
  socialNetworkName: string;

  @Field()
  socialNetworkIcon: string;

  @Field()
  socialNetworkLinkUrl: string;

  @Field()
  socialNetworkPosition: number;
}
