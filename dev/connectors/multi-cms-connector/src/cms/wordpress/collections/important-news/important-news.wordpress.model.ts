import { Field, ObjectType } from '@nestjs/graphql';
import { ImportantNewsTranslationsWordpress } from '@wordpress/collections/translations/translations.wordpress.model';
import { ImageWordpress } from '@wordpress/collections/system/image.wordpress.model';
import { RolesWordpress } from '@wordpress/collections/roles/roles.wordpress.model';

@ObjectType()
export class ImportantNewsWordpress {
  @Field()
  databaseId: number;

  @Field()
  importantNewTitle: string;

  @Field()
  importantNewContent: string;

  @Field({ nullable: true })
  importantNewButtonLabel: string;

  @Field(() => ImportantNewsImageConnection, { nullable: true })
  importantNewImage?: ImportantNewsImageConnection;

  @Field()
  importantNewAccessRestriction: 'ALLOW' | 'DISALLOW' | 'NONE';

  @Field(() => ImportantNewsRolesConnection, { nullable: true })
  importantNewRoles?: ImportantNewsRolesConnection;

  @Field({ nullable: true })
  importantNewColor?: string;

  @Field({ nullable: true })
  importantNewLinkUrl?: string;

  @Field({ nullable: true })
  importantNewStatisticName?: string;

  @Field(() => [ImportantNewsTranslationsWordpress])
  translations: ImportantNewsTranslationsWordpress[];
}

@ObjectType()
class ImportantNewsImageConnection {
  @Field(() => ImageWordpress, { nullable: true })
  node: ImageWordpress;
}

@ObjectType()
class ImportantNewsRolesConnection {
  @Field(() => [RolesWordpress])
  nodes: RolesWordpress[];
}
