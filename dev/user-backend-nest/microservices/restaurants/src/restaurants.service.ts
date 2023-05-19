import { Injectable, Logger } from '@nestjs/common';
import { RestaurantDTO, RestaurantExternalApiDTO } from './restaurants.dto';
import { UlApi } from './config/configuration.interfaces';
import { ConfigService } from '@nestjs/config';
import { HttpService } from '@nestjs/axios';
import { Observable, catchError, map } from 'rxjs';
import { RpcException } from '@nestjs/microservices';

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
            const open =
              restaurant.opening?.trim()?.toLocaleLowerCase() !== 'fermé';
            return {
              id: restaurant.id,
              title: restaurant.title,
              opening: restaurant.opening,
              open,
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
}
