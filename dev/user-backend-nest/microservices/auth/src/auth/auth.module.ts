import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { ConfigModule } from '@nestjs/config';
import { HttpModule } from '@nestjs/axios';
import { CasService } from './cas.service';
import { UserService } from './user.service';

@Module({
  imports: [ConfigModule, HttpModule],
  providers: [AuthService, CasService, UserService],
  controllers: [AuthController],
})
export class AuthModule {}
