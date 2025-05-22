import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class ImageWordpress {
  @Field()
  databaseId: number;

  @Field()
  altText: string;

  @Field()
  date: Date;

  @Field()
  description: string;

  @Field()
  filesize: number;

  @Field()
  mediaDetails: MediaDetails;

  @Field()
  mediaItemUrl: string;

  @Field()
  mimeType: string;

  @Field()
  modified: Date;

  @Field()
  sourceUrl: string;

  @Field()
  title: string;
}

class MediaDetails {
  @Field()
  file: string;

  @Field()
  height: number;

  @Field()
  width: number;
}
