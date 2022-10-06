import { Module } from '@nestjs/common';
import { HelloModule } from './hello/hello.module';
import { ConfigModule } from '@nestjs/config';
@Module({
  imports: [ConfigModule.forRoot({}), HelloModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
