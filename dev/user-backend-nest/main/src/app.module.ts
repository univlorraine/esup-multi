import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { ClientsModule } from '@nestjs/microservices';
import { AppController } from './app.controller';
import microserviceMathConfig from './config/microservice-math.config';
import microserviceHelloConfig from './config/microservice-hello.config';
import microserviceInfoConfig from './config/microservice-info.config';

@Module({
  imports: [
    ConfigModule.forRoot({}),
    ClientsModule.registerAsync([
      {
        name: 'HELLO_SERVICE',
        imports: [ConfigModule.forFeature(microserviceHelloConfig)],
        useFactory: (config: ConfigService) => config.get('microservice-hello'),
        inject: [ConfigService],
      },
      {
        name: 'MATH_SERVICE',
        imports: [ConfigModule.forFeature(microserviceMathConfig)],
        useFactory: (config: ConfigService) => config.get('microservice-math'),
        inject: [ConfigService],
      },
      {
        name: 'INFO_SERVICE',
        imports: [ConfigModule.forFeature(microserviceInfoConfig)],
        useFactory: (config: ConfigService) => config.get('microservice-info'),
        inject: [ConfigService],
      },
    ]),
  ],
  controllers: [AppController],
  providers: [],
})
export class AppModule {}
