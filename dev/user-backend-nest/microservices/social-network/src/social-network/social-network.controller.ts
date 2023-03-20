import { Controller } from '@nestjs/common';
import { MessagePattern } from '@nestjs/microservices';
import { Observable } from 'rxjs';
import { SocialNetworkDto } from './social-network.dto';
import { SocialNetworkService } from './social-network.service';

@Controller()
export class SocialNetworkController {
  constructor(private readonly socialNetworkService: SocialNetworkService) {}

  @MessagePattern({ cmd: 'socialNetwork' })
  getSocialNetwork(): Observable<SocialNetworkDto[]> {
    return this.socialNetworkService.getSocialNetworks();
  }
}
