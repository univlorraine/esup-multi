import { Controller } from '@nestjs/common';
import { MessagePattern } from '@nestjs/microservices';
import { Observable } from 'rxjs';
import { MapService } from './map.service';
import { Marker } from './marker.dto';

@Controller()
export class MapController {
  constructor(private readonly mapService: MapService) {}

  @MessagePattern({ cmd: 'map' })
  getMarkers(): Observable<Marker[]> {
    return this.mapService.getMarkers();
  }
}
