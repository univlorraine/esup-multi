import { CacheModule } from '@nestjs/cache-manager';
import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { ImportantNewsController } from './important-news.controller';
import { ImportantNewsService } from './important-news.service';
import { KeepaliveHttpModule } from '../keepalive-http.module';

@Module({
  imports: [
    ConfigModule,
    KeepaliveHttpModule,
    CacheModule.registerAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        ttl: configService.get<number>('cacheTtl') || 300,
      }),
      inject: [ConfigService],
    }),
  ],
  providers: [ImportantNewsService],
  controllers: [ImportantNewsController],
})
export class ImportantNewsModule {}
