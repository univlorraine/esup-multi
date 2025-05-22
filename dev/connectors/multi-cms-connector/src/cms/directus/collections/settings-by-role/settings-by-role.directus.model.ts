import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class SettingsByRoleDirectus {
  @Field()
  id: number;

  @Field()
  sort: number;

  @Field()
  settings_by_role_id: SettingsByRoleId;
}

@ObjectType()
class SettingsByRoleId {
  @Field()
  id: number;

  @Field()
  position: number;

  @Field()
  role: string;
}
