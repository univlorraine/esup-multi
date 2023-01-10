import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TilesController } from './tiles.controller';
import { InfoService } from './info/info.service';
import { AppsService } from './apps/apps.service';
import { TilesService } from './tiles.service';

@Module({
  imports: [ConfigModule, HttpModule],
  providers: [InfoService, AppsService, TilesService],
  controllers: [TilesController],
})
export class TilesModule {}
