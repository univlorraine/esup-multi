import { CacheModule } from '@nestjs/cache-manager';
import { Module } from '@nestjs/common';
import { redisStore } from 'cache-manager-redis-yet';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MailCalendarService } from './mail-calendar.service';
import { MailCalendarController } from './mail-calendar.controller';
import { KeepaliveHttpModule } from '../keepalive-http.module';
import { RedisSocket } from '../config/configuration.interface';

@Module({
  imports: [
    ConfigModule,
    KeepaliveHttpModule,
    CacheModule.registerAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        store: await redisStore({
          socket: configService.get<RedisSocket>('redisSocket'),
          password: configService.get<string>('redisPassword'),
        }),
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
