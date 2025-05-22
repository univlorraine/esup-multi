import { Field, ObjectType } from '@nestjs/graphql';
import { ChannelsTranslations } from '@common/models/translations.model';

// Modèle pour les canaux des notifications attendu par le backend de Multi
@ObjectType()
export class Channels {
  @Field()
  id: string;

  @Field({ nullable: true })
  code: string;

  @Field({ nullable: true })
  color: string;

  @Field({ nullable: true })
  filterable: boolean;

  @Field({ nullable: true })
  icon: string;

  @Field({ nullable: true })
  routerLink: string;

  @Field(() => [ChannelsTranslations], { nullable: true })
  translations: ChannelsTranslations[];
}
