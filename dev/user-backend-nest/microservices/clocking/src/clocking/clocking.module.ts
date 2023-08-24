import { CacheModule } from '@nestjs/cache-manager';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { ClockingService } from './clocking.service';
import { ClockingController } from './clocking.controller';
import { KeepaliveHttpModule } from '../keepalive-http.module';

@Module({
  imports: [ConfigModule, KeepaliveHttpModule, CacheModule.register()],
  providers: [ClockingService],
  controllers: [ClockingController],
})
export class ClockingModule {}
