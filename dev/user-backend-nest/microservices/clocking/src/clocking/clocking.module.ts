import { Module } from '@nestjs/common';
import { ClockingService } from './clocking.service';
import { ClockingController } from './clocking.controller';
import { ConfigModule } from '@nestjs/config';
import { KeepaliveHttpModule } from '../keepalive-http.module';

@Module({
  imports: [ConfigModule, KeepaliveHttpModule],
  providers: [ClockingService],
  controllers: [ClockingController],
})
export class ClockingModule {}
