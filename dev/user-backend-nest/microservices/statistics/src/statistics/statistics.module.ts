import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { StatisticsController } from './statistics.controller';
import { StatisticsService } from './statistics.service';
import { KeepaliveHttpModule } from '../keepalive-http.module';

@Module({
  imports: [ConfigModule, KeepaliveHttpModule],
  controllers: [StatisticsController],
  providers: [StatisticsService],
})
export class StatisticsModule {}
