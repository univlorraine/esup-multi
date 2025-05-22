import { Field, ObjectType } from '@nestjs/graphql';
import { StaticPagesTranslations } from '@common/models/translations.model';

// Modèle pour les pages statiques attendu par le backend de Multi
@ObjectType()
export class StaticPages {
  @Field()
  id: string;

  @Field({ nullable: true })
  icon: string;

  @Field({ nullable: true })
  iconSvgDark: string;

  @Field({ nullable: true })
  iconSvgLight: string;

  @Field({ nullable: true })
  position: number;

  @Field({ nullable: true })
  statisticName: string;

  @Field(() => [StaticPagesTranslations], { nullable: true })
  translations: StaticPagesTranslations[];
}
