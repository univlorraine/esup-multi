import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { ClockingModule } from './clocking/clocking.module';
import configuration from './config/configuration';

@Module({
  imports: [ConfigModule.forRoot({ load: [configuration] }), ClockingModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
