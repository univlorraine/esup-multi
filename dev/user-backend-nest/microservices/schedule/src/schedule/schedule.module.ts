import { CacheModule } from '@nestjs/cache-manager';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { ScheduleController } from './schedule.controller';
import { ScheduleService } from './schedule.service';
import { KeepaliveHttpModule } from '../keepalive-http.module';

@Module({
  imports: [ConfigModule, KeepaliveHttpModule, CacheModule.register()],
  controllers: [ScheduleController],
  providers: [ScheduleService],
})
export class ScheduleModule {}
