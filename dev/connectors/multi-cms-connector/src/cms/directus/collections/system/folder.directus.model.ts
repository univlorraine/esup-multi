import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class FolderDirectus {
  @Field()
  id: number;

  @Field()
  name: string;

  @Field()
  parent: FolderDirectus;
}
