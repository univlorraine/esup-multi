import { Controller } from '@nestjs/common';
import { RestaurantsService } from './restaurants.service';
import { MessagePattern } from '@nestjs/microservices';
import { RestaurantDTO } from './restaurants.dto';
import { Observable } from 'rxjs';

@Controller()
export class RestaurantsController {
  constructor(private readonly restaurantsService: RestaurantsService) {}

  @MessagePattern({ cmd: 'restaurants' })
  getRestaurants(): Observable<RestaurantDTO[]> {
    return this.restaurantsService.getRestaurants();
  }
}
