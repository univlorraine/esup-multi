import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import configuration from './config/configuration';
import { ImportantNewsModule } from './important-news/important-news.module';
import { MonitoringModule } from './monitoring/monitoring.module';

@Module({
  imports: [
    ConfigModule.forRoot({ load: [configuration] }),
    ImportantNewsModule,
    MonitoringModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
