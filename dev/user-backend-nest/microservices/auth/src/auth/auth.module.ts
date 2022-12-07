import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { ConfigModule } from '@nestjs/config';
import { HttpModule } from '@nestjs/axios';
import { CasService } from './cas.service';
import { UserService } from './user.service';
import { AuthenticatedUserRepository } from './authenticated-user/authenticated-user.repository';
import { MongooseModule } from '@nestjs/mongoose';
import {
  AuthenticatedUser,
  AuthenticatedUserSchema,
} from './authenticated-user/authenticated-user.schema';

@Module({
  imports: [
    ConfigModule,
    HttpModule,
    MongooseModule.forFeature([
      { name: AuthenticatedUser.name, schema: AuthenticatedUserSchema },
    ]),
  ],
  providers: [
    AuthService,
    CasService,
    UserService,
    AuthenticatedUserRepository,
  ],
  controllers: [AuthController],
  exports: [AuthService],
})
export class AuthModule {}
