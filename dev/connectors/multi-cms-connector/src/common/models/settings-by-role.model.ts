import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class SettingsByRole {
  @Field({ nullable: true })
  position: number;

  @Field({ nullable: true })
  role: string;
}
