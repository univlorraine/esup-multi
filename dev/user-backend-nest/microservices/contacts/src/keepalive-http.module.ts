import { Logger, Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { HttpModule } from '@nestjs/axios';
import * as Agent from 'agentkeepalive';
import { KeepAliveOptions } from './config/configuration.interfaces';

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
  exports: [HttpModule],
})
export class KeepaliveHttpModule {}
