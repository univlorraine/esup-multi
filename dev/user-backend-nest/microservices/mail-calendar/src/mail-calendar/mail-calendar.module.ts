import { CacheModule } from '@nestjs/cache-manager';
import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MailCalendarService } from './mail-calendar.service';
import { MailCalendarController } from './mail-calendar.controller';
import { KeepaliveHttpModule } from '../keepalive-http.module';

@Module({
  imports: [
    ConfigModule,
    KeepaliveHttpModule,
    CacheModule.registerAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        ttl: configService.get<number>('cacheTtl') || 300,
        max: configService.get<number>('cacheMax') || 200,
      }),
      inject: [ConfigService],
    }),
  ],
  providers: [MailCalendarService],
  controllers: [MailCalendarController],
})
export class MailCalendarModule {}
