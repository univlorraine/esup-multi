import { Component, OnInit } from '@angular/core';
import { RestaurantsService } from './restaurants.service';
import { catchError, first, map} from 'rxjs/operators';
import { Observable, combineLatest, from, of } from 'rxjs';
import { restaurants$, favoriteRestaurantId$, setFavoriteRestaurant } from './restaurants.repository';
import { Geolocation, Position } from '@capacitor/geolocation';
import { getDistance } from 'geolib';
import { Network } from '@capacitor/network';

export interface PositionDto {
  latitude: number;
  longitude: number;
}
export interface RestaurantDto {
  id: string;
  title: string;
  thumbnailUrl: string;
  shortDesc: string;
  opening: string;
  open: boolean;
  distance: number;
  favorite: boolean;
}
@Component({
  selector: 'app-restaurants',
  templateUrl: './restaurants.page.html',
  styleUrls: ['./restaurants.page.scss'],
})
export class RestaurantsPage implements OnInit {

  public restaurants$: Observable<RestaurantDto[]>;

  constructor(
    private restaurantsService: RestaurantsService,
  ) { }

  async ngOnInit() {
    if (!(await Network.getStatus()).connected) {
      return;
    }

    this.restaurantsService.loadAndStoreRestaurants()
      .pipe(first())
      .subscribe();
  }

  ionViewWillEnter() {
    this.initRestaurantsByPosition();
  }

  setFavoriteRestaurant(restaurantId: string) {
    setFavoriteRestaurant(restaurantId);
  }

  unsetFavoriteRestaurant(restaurantId: string) {
    setFavoriteRestaurant(null);
  }

  private getMyCurrentPosition(): Observable<PositionDto> {
    return from(Geolocation.getCurrentPosition()).pipe(
      map((position: Position) => {
        const {latitude, longitude} = position.coords;
        return {
          latitude,
          longitude
        };
      }),
      catchError(() => of(null))
    );
  }

  private calculateDistanceInKilometers(fromPosition: PositionDto, toPosition: PositionDto): number {
    return getDistance(fromPosition, toPosition) / 1000 ;
  }

  private initRestaurantsByPosition() {
    this.restaurants$ = combineLatest([
      restaurants$,
      this.getMyCurrentPosition(),
      favoriteRestaurantId$
    ]).pipe(
      map(([restaurants, myPosition, favoriteRestaurantId]) => {
        const restaurantsSortedByDistance = restaurants
          // Restaurant from store to RestaurantDto to display
          .map(restaurant => {
            const restaurantPosition = {
              latitude: restaurant.latitude,
              longitude: restaurant.longitude
            };
            const distance = (myPosition) ? this.calculateDistanceInKilometers(myPosition, restaurantPosition) : null;
            return {
              id: restaurant.id,
              title: restaurant.title,
              thumbnailUrl: restaurant.thumbnailUrl,
              shortDesc: restaurant.shortDesc,
              opening: restaurant.opening,
              open: restaurant.open,
              distance,
              favorite: restaurant.id === favoriteRestaurantId
            };
          })
          // sort by distance
          .sort((restaurantA, restaurantB) => restaurantA.distance - restaurantB.distance);

          // favorite restaurants comes first
          const favoriteRestaurants = restaurantsSortedByDistance.filter(r => r.favorite === true);
          const nonFavoriteRestaurants = restaurantsSortedByDistance.filter(r => r.favorite === false);
          return [...favoriteRestaurants, ...nonFavoriteRestaurants];
      })
    );
  }

}
