import { HttpModule } from '@nestjs/axios';
import { Logger, Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { FeaturesController } from './features.controller';
import { FeaturesService } from './features.service';
import { KeepAliveOptions } from '../config/configuration.interface';
import * as Agent from 'agentkeepalive';

@Module({
  imports: [
    ConfigModule,
    HttpModule.registerAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => {
        const keepAliveOptions =
          configService.get<KeepAliveOptions>('keepAliveOptions');
        Logger.log('Using agentkeepalive options', keepAliveOptions);
        return {
          httpAgent: new Agent(keepAliveOptions),
          httpsAgent: new Agent(keepAliveOptions),
        };
      },
      inject: [ConfigService],
    }),
  ],
  providers: [FeaturesService],
  controllers: [FeaturesController],
})
export class FeaturesModule {}
