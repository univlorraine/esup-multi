import { HttpModule } from '@nestjs/axios';
import { ConfigModule } from '@nestjs/config';
import { Module } from '@nestjs/common';
import { SocialNetworkController } from './social-network.controller';
import { SocialNetworkService } from './social-network.service';
import * as http from 'http';
import * as https from 'https';

@Module({
  imports: [ConfigModule, 
            HttpModule.register({
              httpAgent: new http.Agent({ keepAlive: true }),
              httpsAgent: new https.Agent({ keepAlive: true }),
            }),
           ],

  controllers: [SocialNetworkController],
  providers: [SocialNetworkService],
})
export class SocialNetworkModule {}
