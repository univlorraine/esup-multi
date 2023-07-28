import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import configuration from './config/configuration';
import { ContactsModule } from './contacts/contacts.module';
import { MonitoringModule } from './monitoring/monitoring.module';

@Module({
  imports: [
    ConfigModule.forRoot({ load: [configuration] }),
    HttpModule,
    ContactsModule,
    MonitoringModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
