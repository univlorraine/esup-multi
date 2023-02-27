import { Module } from '@nestjs/common';
import { ClockingService } from './clocking.service';
import { ClockingController } from './clocking.controller';
import { ConfigModule } from '@nestjs/config';
import { HttpModule } from '@nestjs/axios';

@Module({
  imports: [ConfigModule, HttpModule],
  providers: [ClockingService],
  controllers: [ClockingController],
})
export class ClockingModule {}
