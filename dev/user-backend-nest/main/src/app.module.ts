import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { ClientsModule } from '@nestjs/microservices';
import { AppController } from './app.controller';
import microserviceAuthConfig from './config/microservice-auth.config';
import microserviceInfoConfig from './config/microservice-info.config';
import microserviceMapConfig from './config/microservice-map.config';

@Module({
  imports: [
    ConfigModule.forRoot({}),
    ClientsModule.registerAsync([
      {
        name: 'INFO_SERVICE',
        imports: [ConfigModule.forFeature(microserviceInfoConfig)],
        useFactory: (config: ConfigService) => config.get('microservice-info'),
        inject: [ConfigService],
      },
      {
        name: 'AUTH_SERVICE',
        imports: [ConfigModule.forFeature(microserviceAuthConfig)],
        useFactory: (config: ConfigService) => config.get('microservice-auth'),
        inject: [ConfigService],
      },
      {
        name: 'MAP_SERVICE',
        imports: [ConfigModule.forFeature(microserviceMapConfig)],
        useFactory: (config: ConfigService) => config.get('microservice-map'),
        inject: [ConfigService],
      },
    ]),
  ],
  controllers: [AppController],
  providers: [],
})
export class AppModule {}
