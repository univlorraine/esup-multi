import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { Controller, Inject } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { MessagePattern } from '@nestjs/microservices';
import { Cache } from 'cache-manager';
import { firstValueFrom } from 'rxjs';
import {
  RestaurantDTO,
  RestaurantMenu,
  RestaurantMenusQueryDto,
} from './restaurants.dto';
import { RestaurantsService } from './restaurants.service';

@Controller()
export class RestaurantsController {
  constructor(
    private readonly restaurantsService: RestaurantsService,
    private readonly configService: ConfigService,
    @Inject(CACHE_MANAGER) private cacheManager: Cache,
  ) {}

  @MessagePattern({ cmd: 'restaurants' })
  async getRestaurants(): Promise<RestaurantDTO[]> {
    const cacheKey = `restaurants`;

    const cachedRestaurants = await this.cacheManager.get<RestaurantDTO[]>(
      cacheKey,
    );
    if (cachedRestaurants !== undefined) {
      return cachedRestaurants;
    }

    const restaurants = await firstValueFrom(
      this.restaurantsService.getRestaurants(),
    );
    const ttl = this.configService.get<number>('cacheTtl.restaurants') || 300;
    await this.cacheManager.set(cacheKey, restaurants, ttl);

    return restaurants;
  }

  @MessagePattern({ cmd: 'restaurant/menus' })
  async getRestaurantMenus(
    data: RestaurantMenusQueryDto,
  ): Promise<RestaurantMenu[]> {
    const cacheKey = `restaurant-menus-${JSON.stringify(data)}`;

    const cachedMenus = await this.cacheManager.get<RestaurantMenu[]>(cacheKey);
    if (cachedMenus !== undefined) {
      return cachedMenus;
    }

    const menus = await firstValueFrom(
      this.restaurantsService.getRestaurantMenus(data),
    );
    const ttl = this.configService.get<number>('cacheTtl.menus') || 300;
    await this.cacheManager.set(cacheKey, menus, ttl);

    return menus;
  }
}
