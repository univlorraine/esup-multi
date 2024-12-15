/*
 * Copyright ou © ou Copr. Université de Lorraine, (2022)
 *
 * Direction du Numérique de l'Université de Lorraine - SIED
 *  (dn-mobile-dev@univ-lorraine.fr)
 * JNESIS (contact@jnesis.com)
 *
 * Ce logiciel est un programme informatique servant à rendre accessible
 * sur mobile divers services universitaires aux étudiants et aux personnels
 * de l'université.
 *
 * Ce logiciel est régi par la licence CeCILL 2.1, soumise au droit français
 * et respectant les principes de diffusion des logiciels libres. Vous pouvez
 * utiliser, modifier et/ou redistribuer ce programme sous les conditions
 * de la licence CeCILL telle que diffusée par le CEA, le CNRS et INRIA
 * sur le site "http://cecill.info".
 *
 * En contrepartie de l'accessibilité au code source et des droits de copie,
 * de modification et de redistribution accordés par cette licence, il n'est
 * offert aux utilisateurs qu'une garantie limitée. Pour les mêmes raisons,
 * seule une responsabilité restreinte pèse sur l'auteur du programme, le
 * titulaire des droits patrimoniaux et les concédants successifs.
 *
 * À cet égard, l'attention de l'utilisateur est attirée sur les risques
 * associés au chargement, à l'utilisation, à la modification et/ou au
 * développement et à la reproduction du logiciel par l'utilisateur étant
 * donné sa spécificité de logiciel libre, qui peut le rendre complexe à
 * manipuler et qui le réserve donc à des développeurs et des professionnels
 * avertis possédant des connaissances informatiques approfondies. Les
 * utilisateurs sont donc invités à charger et à tester l'adéquation du
 * logiciel à leurs besoins dans des conditions permettant d'assurer la
 * sécurité de leurs systèmes et/ou de leurs données et, plus généralement,
 * à l'utiliser et à l'exploiter dans les mêmes conditions de sécurité.
 *
 * Le fait que vous puissiez accéder à cet en-tête signifie que vous avez
 * pris connaissance de la licence CeCILL 2.1, et que vous en avez accepté les
 * termes.
 */

import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Geolocation, Position } from '@capacitor/geolocation';
import { NetworkService } from '@multi/shared';
import { getDistance } from 'geolib';
import { combineLatest, from, Observable, of } from 'rxjs';
import { catchError, map, take, tap } from 'rxjs/operators';
import { favoritesRestaurantsIds$, RestaurantOpening, restaurants$, setFavoriteRestaurant, unsetFavoriteRestaurant } from './restaurants.repository';
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
  styleUrls: ['../../../../src/theme/app-theme/styles/restaurants/restaurants.page.scss'],
})
export class RestaurantsPage implements OnInit {

  public restaurants$: Observable<RestaurantDto[]>;
  public isLoading = false;
  public restaurantsIsEmpty$: Observable<boolean>;


  constructor(
    private restaurantsService: RestaurantsService,
    private router: Router,
    private networkService: NetworkService
  ) {
  }
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
    unsetFavoriteRestaurant(restaurantId);
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
      favoritesRestaurantsIds$
    ]).pipe(
      map(([restaurants, myPosition, favoritesRestaurantsIds]) => {
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
              favorite: favoritesRestaurantsIds.includes(restaurant.id)
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
