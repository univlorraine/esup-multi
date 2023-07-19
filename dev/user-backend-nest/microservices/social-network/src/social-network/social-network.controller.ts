import { Controller } from '@nestjs/common';
import { MessagePattern } from '@nestjs/microservices';
import { Observable } from 'rxjs';
import { SocialNetworkDto } from './social-network.dto';
import { SocialNetworkService } from './social-network.service';
import * as infosJsonData from '../infos.json';

@Controller()
export class SocialNetworkController {
  constructor(private readonly socialNetworkService: SocialNetworkService) {}

  @MessagePattern({ cmd: 'socialNetwork' })
  getSocialNetwork(): Observable<SocialNetworkDto[]> {
    return this.socialNetworkService.getSocialNetworks();
  }

  @MessagePattern({ cmd: 'health' })
  getHealthStatus() {
    return {
      message: 'up',
      name: infosJsonData.name,
      version: infosJsonData.version,
    };
  }

  @MessagePattern({ cmd: 'version' })
  getVersion() {
    return {
      version: infosJsonData.version,
    };
  }
}
