import { Field, ObjectType } from '@nestjs/graphql';
import { ContactUsTranslations } from '@common/models/translations.model';

@ObjectType()
export class ContactUs {
  @Field({ nullable: true })
  icon: string;

  @Field()
  to: string;

  @Field(() => [ContactUsTranslations], { nullable: true })
  translations: ContactUsTranslations[];
}
