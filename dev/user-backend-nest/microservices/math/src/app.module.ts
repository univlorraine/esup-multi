import { Module } from '@nestjs/common';
import { SumModule } from './sum/sum.module';
import { ConfigModule } from '@nestjs/config';
@Module({
  imports: [
    ConfigModule.forRoot({}),
    SumModule
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
