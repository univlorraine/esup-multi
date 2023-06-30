import { Controller } from '@nestjs/common';
import { MessagePattern } from '@nestjs/microservices';
import { Observable } from 'rxjs';
import {
  RestaurantDTO,
  RestaurantMenu,
  RestaurantMenusQueryDto
} from './restaurants.dto';
import { RestaurantsService } from './restaurants.service';
import * as infosJsonData from './infos.json';

@Controller()
export class RestaurantsController {
  constructor(private readonly restaurantsService: RestaurantsService) {}

  @MessagePattern({ cmd: 'restaurants' })
  getRestaurants(): Observable<RestaurantDTO[]> {
    return this.restaurantsService.getRestaurants();
  }

  @MessagePattern({ cmd: 'restaurant/menus' })
  getRestaurantMenus(data: RestaurantMenusQueryDto): Observable<RestaurantMenu[]> {
    return this.restaurantsService.getRestaurantMenus(data);
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
