import { HttpService } from '@nestjs/axios';
import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { RpcException } from '@nestjs/microservices';
import { catchError, map, Observable } from 'rxjs';
import { UlApi } from '../config/configuration.interfaces';
import {
  RestaurantDTO,
  RestaurantExternalApiDTO,
  RestaurantMenu,
  RestaurantMenusQueryDto,
  RestaurantOpening,
} from './restaurants.dto';

@Injectable()
export class RestaurantsService {
  private readonly logger = new Logger(RestaurantsService.name);
  private ulApiConfig: UlApi;

  constructor(
    private readonly configService: ConfigService,
    private readonly httpService: HttpService,
  ) {
    this.ulApiConfig = this.configService.get<UlApi>('ulApi');
  }
  getRestaurants(): Observable<RestaurantDTO[]> {
    return this.httpService
      .get<RestaurantExternalApiDTO[]>(this.ulApiConfig.url, {
        headers: {
          Accept: 'application/json',
          Authorization: `Bearer ${this.ulApiConfig.bearerToken}`,
        },
      })
      .pipe(
        catchError((err) => {
          const errorMessage = `Unable to get restaurants`;
          this.logger.error(errorMessage, err);
          throw new RpcException(errorMessage);
        }),
        map((res) =>
          res.data.map((restaurant) => {
            const opening: Record<string, RestaurantOpening> = {};
            Object.keys(restaurant.opening).forEach((key) => {
              opening[key] = {
                label: restaurant.opening[key].label,
                isOpen: restaurant.opening[key].is_open,
              };
            });
            return {
              id: restaurant.id,
              title: restaurant.title,
              opening,
              contact: restaurant.contact,
              infos: restaurant.infos,
              zone: restaurant.zone,
              latitude: restaurant.lat,
              longitude: restaurant.lon,
              thumbnailUrl: restaurant.thumbnail_url,
              shortDesc: restaurant.short_desc,
            };
          }),
        ),
      );
  }

  getRestaurantMenus(
    query: RestaurantMenusQueryDto,
  ): Observable<RestaurantMenu[]> {
    const url = `${this.ulApiConfig.url}/${query.id}`;
    const params = query.date ? `/defaultMeal?datetime=${query.date}` : '';

    return this.httpService
      .get<RestaurantMenu[]>(`${url}${params}`, {
        headers: {
          Accept: 'application/json',
          Authorization: `Bearer ${this.ulApiConfig.bearerToken}`,
        },
      })
      .pipe(
        catchError((err) => {
          const errorMessage = `Unable to get menu`;
          this.logger.error(errorMessage, err);
          throw new RpcException(errorMessage);
        }),
        map((res) => res.data),
      );
  }
}
