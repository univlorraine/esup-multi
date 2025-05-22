import { Field, ObjectType } from '@nestjs/graphql';

// Modèle pour les réseaux sociaux attendu par le backend de Multi
@ObjectType()
export class SocialNetworks {
  @Field()
  id: string;

  @Field({ nullable: true })
  icon: string;

  @Field({ nullable: true })
  link: string;

  @Field({ nullable: true })
  title: string;

  @Field({ nullable: true })
  position: number;
}
