import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { KnowledgeBaseModule } from './knowledge-base/knowledge-base.module';
import { MonitoringModule } from './monitoring/monitoring.module';
import configuration from './config/configuration';

@Module({
  imports: [
    ConfigModule.forRoot({ load: [configuration] }),
    KnowledgeBaseModule,
    MonitoringModule,
  ],
})
export class AppModule {}
