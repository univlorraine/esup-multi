import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { CardsController } from './cards.controller';
import { CardsService } from './cards.service';
import { KeepaliveHttpModule } from '../keepalive-http.module';

@Module({
  imports: [ConfigModule, KeepaliveHttpModule],
  providers: [CardsService],
  controllers: [CardsController],
})
export class CardsModule {}
