import { Module } from '@nestjs/common';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot({}),
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'www'),
    }),
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
