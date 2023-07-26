import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import configuration from './config/configuration';
import { SocialNetworkModule } from './social-network/social-network.module';
import { MonitoringModule } from './monitoring/monitoring.module';

@Module({
  imports: [
    ConfigModule.forRoot({ load: [configuration] }),
    SocialNetworkModule,
    MonitoringModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
