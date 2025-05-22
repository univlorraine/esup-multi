import { Field, ObjectType } from '@nestjs/graphql';

// Modèle pour les langues attendu par le backend de Multi
@ObjectType()
export class Languages {
  @Field({ nullable: true })
  code: string;

  @Field({ nullable: true })
  direction: string;

  @Field({ nullable: true })
  name: string;

  @Field({ nullable: true })
  locale: string;
}
