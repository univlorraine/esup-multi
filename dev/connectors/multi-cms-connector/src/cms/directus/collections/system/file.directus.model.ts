import { Field, ObjectType } from '@nestjs/graphql';
import { FolderDirectus } from '@directus/collections/system/folder.directus.model';

@ObjectType()
export class FileDirectus {
  @Field()
  id: number;

  @Field()
  charset: string;

  @Field()
  created_on: Date;

  @Field()
  description: string;

  @Field()
  duration: number;

  @Field()
  filename_disk: string;

  @Field()
  filename_download: string;

  @Field()
  filesize: number;

  @Field()
  focal_point_x: number;

  @Field()
  focal_point_y: number;

  @Field()
  folder: FolderDirectus;

  @Field()
  height: number;

  @Field()
  location: string;

  @Field()
  metadata: object;

  @Field()
  storage: string;

  @Field()
  tags: string[];

  @Field()
  title: string;

  @Field()
  type: string;

  @Field()
  upload_on: Date;

  @Field()
  width: number;
}
