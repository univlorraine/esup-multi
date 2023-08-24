import { CacheModule } from '@nestjs/cache-manager';
import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { PageContentService } from './page-content.service';
import { PageContentController } from './page-content.controller';
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
  providers: [PageContentService],
  controllers: [PageContentController],
})
export class PageContentModule {}
