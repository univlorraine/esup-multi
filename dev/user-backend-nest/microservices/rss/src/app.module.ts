import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import configuration from './config/configuration';
import { MonitoringModule } from './monitoring/monitoring.module';
import { RssModule } from './rss/rss.module';

@Module({
  imports: [
    ConfigModule.forRoot({ load: [configuration] }),
    RssModule,
    MonitoringModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
