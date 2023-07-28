import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import configuration from './config/configuration';
import { MonitoringModule } from './monitoring/monitoring.module';
import { ScheduleModule } from './schedule/schedule.module';

@Module({
  imports: [
    ConfigModule.forRoot({ load: [configuration] }),
    ScheduleModule,
    MonitoringModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
