import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import configuration from './config/configuration';
import { TilesModule } from './tiles/tiles.module';
@Module({
  imports: [ConfigModule.forRoot({ load: [configuration] }), TilesModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
