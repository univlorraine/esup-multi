import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import configuration from './config/configuration';
import { FeaturesModule } from './features/features.module';
@Module({
  imports: [ConfigModule.forRoot({ load: [configuration] }), FeaturesModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
