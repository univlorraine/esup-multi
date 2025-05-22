import { Field, ObjectType } from '@nestjs/graphql';
import { LoginTranslations } from '@common/models/translations.model';

@ObjectType()
export class Login {
  @Field(() => [LoginTranslations], { nullable: true })
  translations: LoginTranslations[];
}
