import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { LoginPageContentService } from '../page-content/login-page-content/login-page-content.service';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { AuthenticatedUserRepository } from './authenticated-user/authenticated-user.repository';
import {
  AuthenticatedUser,
  AuthenticatedUserSchema
} from './authenticated-user/authenticated-user.schema';
import { CasService } from './cas.service';
import { UserService } from './user.service';

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
    LoginPageContentService,
  ],
  controllers: [AuthController],
  exports: [AuthService],
})
export class AuthModule {}
