import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { FeaturesController } from './features.controller';
import { FeaturesService } from './features.service';

@Module({
  imports: [ConfigModule, HttpModule],
  providers: [FeaturesService],
  controllers: [FeaturesController],
})
export class FeaturesModule {}
