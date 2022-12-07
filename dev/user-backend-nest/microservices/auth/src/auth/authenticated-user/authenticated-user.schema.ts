import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type AuthenticatedUserDocument = HydratedDocument<AuthenticatedUser>;

@Schema()
export class AuthenticatedUser {
  @Prop()
  username: string;

  @Prop({ unique: true })
  authToken: string;

  @Prop({ default: [] })
  roles: string[];

  @Prop({ default: new Date() })
  lastUsedAt: Date;
}

export const AuthenticatedUserSchema =
  SchemaFactory.createForClass(AuthenticatedUser);
