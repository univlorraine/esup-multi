import { Controller } from '@nestjs/common';
import { MessagePattern } from '@nestjs/microservices';
import { Observable } from 'rxjs';
import { Feature } from './features.dto';
import { FeaturesService } from './features.service';

@Controller()
export class FeaturesController {
  constructor(private featuresService: FeaturesService) {}

  @MessagePattern({ cmd: 'features' })
  getFeatures(userRoles: string[]): Observable<Feature[]> {
    return this.featuresService.getFeatures(userRoles);
  }
}
