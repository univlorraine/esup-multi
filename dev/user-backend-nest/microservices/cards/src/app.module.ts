import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { CardsModule } from './cards/cards.module';
import configuration from './config/configuration';

@Module({
  imports: [ConfigModule.forRoot({ load: [configuration] }), CardsModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
