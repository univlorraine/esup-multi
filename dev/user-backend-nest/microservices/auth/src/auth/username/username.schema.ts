import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type UsernameDocument = HydratedDocument<Username>;

@Schema()
export class Username {
  @Prop()
  username: string;

  @Prop({ unique: true })
  authToken: string;

  @Prop({ default: new Date() })
  lastUsedAt: Date;
}

export const UsernameSchema = SchemaFactory.createForClass(Username);
