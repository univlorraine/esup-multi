import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { CardsController } from './cards.controller';
import { CardsService } from './cards.service';

@Module({
  imports: [ConfigModule, HttpModule],
  providers: [CardsService],
  controllers: [CardsController],
})
export class CardsModule {}
