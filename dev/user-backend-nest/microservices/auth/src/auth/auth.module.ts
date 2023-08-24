import { Module } from '@nestjs/common';
import { CacheModule } from '@nestjs/cache-manager';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { LoginPageContentService } from '../page-content/login-page-content/login-page-content.service';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { AuthenticatedUserRepository } from './authenticated-user/authenticated-user.repository';
import {
  AuthenticatedUser,
  AuthenticatedUserSchema,
} from './authenticated-user/authenticated-user.schema';
import { CasService } from './cas.service';
import { UserService } from './user.service';
import { KeepaliveHttpModule } from '../keepalive-http.module';

@Module({
  imports: [
    ConfigModule,
    KeepaliveHttpModule,
    MongooseModule.forFeature([
      { name: AuthenticatedUser.name, schema: AuthenticatedUserSchema },
    ]),
    CacheModule.registerAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        ttl: configService.get<number>('cacheTtl') || 300,
      }),
      inject: [ConfigService],
    }),
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
