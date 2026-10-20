import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import configuration from './config/configuration.js';
import { KnowledgeBaseModule } from './knowledge-base/knowledge-base.module.js';
import { MonitoringModule } from './monitoring/monitoring.module.js';

@Module({
  imports: [
    ConfigModule.forRoot({ load: [configuration] }),
    KnowledgeBaseModule,
    MonitoringModule,
  ],
})
export class AppModule {}
