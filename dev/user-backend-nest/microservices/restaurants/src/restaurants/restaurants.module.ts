import { CacheModule } from '@nestjs/cache-manager';
import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { RestaurantsController } from './restaurants.controller';
import { RestaurantsService } from './restaurants.service';
import { KeepaliveHttpModule } from '../keepalive-http.module';

@Module({
  imports: [
    ConfigModule,
    KeepaliveHttpModule,
    CacheModule.registerAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        max: configService.get<number>('cacheMax') || 200,
      }),
      inject: [ConfigService],
    }),
  ],
  controllers: [RestaurantsController],
  providers: [RestaurantsService],
})
export class RestaurantsModule {}
