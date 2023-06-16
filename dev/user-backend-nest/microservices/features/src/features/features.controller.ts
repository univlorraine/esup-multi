import { Controller } from '@nestjs/common';
import { MessagePattern } from '@nestjs/microservices';
import { Observable } from 'rxjs';
import { Feature } from './features.dto';
import { FeaturesService } from './features.service';
import * as infosJsonData from '../infos.json';

@Controller()
export class FeaturesController {
  constructor(private featuresService: FeaturesService) {}

  @MessagePattern({ cmd: 'features' })
  getFeatures(userRoles: string[]): Observable<Feature[]> {
    return this.featuresService.getFeatures(userRoles);
  }

  @MessagePattern({ cmd: 'health' })
  getHealthStatus() {
    return {
      message: 'up',
      name: infosJsonData.name,
      version: infosJsonData.version,
    };
  }
}
