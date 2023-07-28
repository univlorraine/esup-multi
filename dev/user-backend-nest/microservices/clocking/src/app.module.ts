import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { ClockingModule } from './clocking/clocking.module';
import configuration from './config/configuration';
import { MonitoringModule } from './monitoring/monitoring.module';

@Module({
  imports: [
    ConfigModule.forRoot({ load: [configuration] }),
    ClockingModule,
    MonitoringModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
