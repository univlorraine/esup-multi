import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { ConfigModule } from '@nestjs/config';
import { HttpModule } from '@nestjs/axios';
import { CasService } from './cas.service';
import { UserService } from './user.service';
import { UsernameRepository } from './username/username.repository';
import { MongooseModule } from '@nestjs/mongoose';
import { Username, UsernameSchema } from './username/username.schema';

@Module({
  imports: [
    ConfigModule,
    HttpModule,
    MongooseModule.forFeature([
      { name: Username.name, schema: UsernameSchema },
    ]),
  ],
  providers: [AuthService, CasService, UserService, UsernameRepository],
  controllers: [AuthController],
  exports: [AuthService],
})
export class AuthModule {}
