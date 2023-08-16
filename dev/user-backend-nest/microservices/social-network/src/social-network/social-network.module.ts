import { HttpModule } from '@nestjs/axios';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { Module } from '@nestjs/common';
import { SocialNetworkController } from './social-network.controller';
import { SocialNetworkService } from './social-network.service';
import * as Agent from 'agentkeepalive';
import { keepAliveOptions } from '../config/configuration.interface';
import { Logger } from '@nestjs/common';

@Module({
  imports: [
    ConfigModule,
    HttpModule.registerAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => {
        const keepAliveOptions =
          configService.get<keepAliveOptions>('keepAliveOptions');
        Logger.log('Using agentkeepalive options', keepAliveOptions);
        return {
          httpAgent: new Agent(keepAliveOptions),
          httpsAgent: new Agent(keepAliveOptions),
        };
      },
      inject: [ConfigService],
    }),
  ],
  controllers: [SocialNetworkController],
  providers: [SocialNetworkService],
})
export class SocialNetworkModule {}
