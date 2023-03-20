import { HttpModule } from '@nestjs/axios';
import { ConfigModule } from '@nestjs/config';
import { Module } from '@nestjs/common';
import { SocialNetworkController } from './social-network.controller';
import { SocialNetworkService } from './social-network.service';

@Module({
  imports: [ConfigModule, HttpModule],
  controllers: [SocialNetworkController],
  providers: [SocialNetworkService],
})
export class SocialNetworkModule {}
