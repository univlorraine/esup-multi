import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type UserCredentialsDocument = HydratedDocument<UserCredentials>;

@Schema()
export class UserCredentials {
  @Prop()
  encryptedUsername: string;

  @Prop()
  encryptedPassword: string;

  @Prop({ default: new Date() })
  lastUsedAt: Date;
}

export const UserCredentialsSchema =
  SchemaFactory.createForClass(UserCredentials);
