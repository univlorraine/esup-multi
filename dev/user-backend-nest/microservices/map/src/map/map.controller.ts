import { Controller } from '@nestjs/common';
import { MessagePattern } from '@nestjs/microservices';
import { Observable } from 'rxjs';
import { MapService } from './map.service';
import { Marker } from './marker.dto';
import * as infosJsonData from '../infos.json';

@Controller()
export class MapController {
  constructor(private readonly mapService: MapService) {}

  @MessagePattern({ cmd: 'map' })
  getMarkers(): Observable<Marker[]> {
    return this.mapService.getMarkers();
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
