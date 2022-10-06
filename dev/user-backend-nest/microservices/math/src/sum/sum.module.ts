import { Module } from '@nestjs/common';
import { SumService } from './sum.service';
import { SumController } from './sum.controller';

@Module({
  providers: [SumService],
  controllers: [SumController],
})
export class SumModule {}
