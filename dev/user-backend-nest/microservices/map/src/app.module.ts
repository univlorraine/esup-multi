import { Module } from '@nestjs/common';
import { MapModule } from './map/map.module';
import { MonitoringModule } from './monitoring/monitoring.module';
@Module({
  imports: [MapModule, MonitoringModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
