import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import configuration from './config/configuration';
import { InfoModule } from './info/info.module';
@Module({
  imports: [ConfigModule.forRoot({ load: [configuration] }), InfoModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
