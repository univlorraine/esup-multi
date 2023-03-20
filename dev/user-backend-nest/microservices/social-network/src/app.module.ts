import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import configuration from './config/configuration';
import { SocialNetworkModule } from './social-network/social-network.module';

@Module({
  imports: [
    ConfigModule.forRoot({ load: [configuration] }),
    SocialNetworkModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
