import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import configuration from './config/configuration';
import { MonitoringModule } from './monitoring/monitoring.module';
import { RestaurantsModule } from './restaurants/restaurants.module';

@Module({
  imports: [
    ConfigModule.forRoot({ load: [configuration] }),
    HttpModule,
    RestaurantsModule,
    MonitoringModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
