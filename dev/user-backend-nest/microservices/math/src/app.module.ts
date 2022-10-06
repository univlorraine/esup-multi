import { Module } from '@nestjs/common';
import { SumModule } from './sum/sum.module';

@Module({
  imports: [SumModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
