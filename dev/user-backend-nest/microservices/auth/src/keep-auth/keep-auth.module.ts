import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { HttpModule } from '@nestjs/axios';
import { KeepAuthService } from './keep-auth.service';
import { KeepAuthController } from './keep-auth.controller';
import { AuthModule } from '../auth/auth.module';
import { MongooseModule } from '@nestjs/mongoose';
import {
  UserCredentials,
  UserCredentialsSchema,
} from './user-credentials/user-credentials.schema';
import { AesEncryptionService } from './encryption/aes-encryption.service';
import { UserCredentialsRepository } from './user-credentials/user-credentials.repository';
import { JwtModule } from '@nestjs/jwt';
import { CasService } from 'src/auth/cas.service';

@Module({
  imports: [
    ConfigModule,
    HttpModule,
    AuthModule,
    MongooseModule.forFeature([
      { name: UserCredentials.name, schema: UserCredentialsSchema },
    ]),
    JwtModule.registerAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        secret: configService.get<string>('jwtSecret'),
      }),
      inject: [ConfigService],
    }),
  ],
  providers: [
    KeepAuthService,
    UserCredentialsRepository,
    AesEncryptionService,
    CasService,
  ],
  controllers: [KeepAuthController],
})
export class KeepAuthModule {}
