import { Field, ObjectType } from '@nestjs/graphql';
import { Authorization } from './authorization.model';
import { ImportantNewsTranslations } from './translations.model';

@ObjectType()
export class ImportantNews {
  @Field()
  id: string;

  @Field(() => Authorization, { nullable: true })
  authorization: Authorization;

  @Field({ nullable: true })
  color: string;

  @Field({ nullable: true })
  image: string;

  @Field({ nullable: true })
  link: string;

  @Field({ nullable: true })
  position: number;

  @Field({ nullable: true })
  statisticName: string;

  @Field(() => [ImportantNewsTranslations], { nullable: true })
  translations: ImportantNewsTranslations[];
}
