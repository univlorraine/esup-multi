import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import configuration from './config/configuration';
import { MailModule } from './mail/mail.module';
import { MonitoringModule } from './monitoring/monitoring.module';
import { PageContentModule } from './page-content/page-content.module';

@Module({
  imports: [
    ConfigModule.forRoot({ load: [configuration] }),
    MailModule,
    PageContentModule,
    MonitoringModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
