import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Geolocation, Position } from '@capacitor/geolocation';
import { NetworkService } from '@ul/shared';
import { getDistance } from 'geolib';
import { combineLatest, from, Observable, of } from 'rxjs';
import { catchError, map, take, tap } from 'rxjs/operators';
import { favoriteRestaurantId$, RestaurantOpening, restaurants$, setFavoriteRestaurant } from './restaurants.repository';
import { RestaurantsService } from './restaurants.service';

export interface PositionDto {
  latitude: number;
  longitude: number;
}
export interface RestaurantDto {
  id: number;
  title: string;
  thumbnailUrl: string;
  shortDesc: string;
  opening: Record<string, RestaurantOpening>;
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
  public isLoading = false;
  public restaurantsIsEmpty$: Observable<boolean>;


  constructor(
    private restaurantsService: RestaurantsService,
    private router: Router,
    private networkService: NetworkService,
  ) { }

  async ngOnInit() {
    if (!(await this.networkService.getConnectionStatus()).connected) {
      return;
    }

    this.restaurantsService.loadAndStoreRestaurants()
      .pipe(take(1))
      .subscribe();
  }

  ionViewWillEnter() {
    this.initRestaurantsByPosition();
  }

  setFavoriteRestaurant(restaurantId: number) {
    setFavoriteRestaurant(restaurantId);
  }

  unsetFavoriteRestaurant(restaurantId: number) {
    setFavoriteRestaurant(null);
  }

  navigateToRestaurantMenus(restaurantId: number) {
    this.router.navigate(['restaurants', restaurantId, 'menu']);
  }

  public getCurrentOpening(opening: Record<string, RestaurantOpening>): RestaurantOpening | undefined {
    return opening[1 + (new Date().getDay() + 6) % 7]; // 1 = monday, 7 = sunday
  }

  private getMyCurrentPosition(): Observable<PositionDto> {
    return from(Geolocation.getCurrentPosition()).pipe(
      map((position: Position) => {
        const { latitude, longitude } = position.coords;
        return {
          latitude,
          longitude
        };
      }),
      catchError(() => of(null))
    );
  }

  private calculateDistanceInKilometers(fromPosition: PositionDto, toPosition: PositionDto): number {
    return getDistance(fromPosition, toPosition) / 1000;
  }

  private initRestaurantsByPosition() {
    this.isLoading = true;

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
      }),
      tap(() => {
        this.isLoading = false;
      })
    );

    this.restaurantsIsEmpty$ = this.restaurants$.pipe(map(restaurants => restaurants.length === 0));
  }
}
