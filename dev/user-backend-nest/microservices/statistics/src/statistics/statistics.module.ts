import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { StatisticsController } from './statistics.controller';
import { StatisticsService } from './statistics.service';

@Module({
  imports: [ConfigModule, HttpModule],
  controllers: [StatisticsController],
  providers: [StatisticsService],
})
export class StatisticsModule {}
