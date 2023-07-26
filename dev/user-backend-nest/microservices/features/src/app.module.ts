import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import configuration from './config/configuration';
import { FeaturesModule } from './features/features.module';
import { MonitoringModule } from './monitoring/monitoring.module';
@Module({
  imports: [
    ConfigModule.forRoot({ load: [configuration] }),
    FeaturesModule,
    MonitoringModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
