import { Controller } from '@nestjs/common';
import { MessagePattern } from '@nestjs/microservices';
import { Observable } from 'rxjs';
import { Tile } from './tiles.dto';
import { TilesService } from './tiles.service';

@Controller('tiles')
export class TilesController {
  constructor(private tilesService: TilesService) {}

  @MessagePattern({ cmd: 'tiles' })
  getTiles(userRoles: string[]): Observable<Tile[]> {
    return this.tilesService.getTiles(userRoles);
  }
}
