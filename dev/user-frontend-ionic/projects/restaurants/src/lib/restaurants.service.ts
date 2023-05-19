import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Restaurant, setRestaurants } from './restaurants.repository';
import { tap } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class RestaurantsService {

  constructor(
    @Inject('environment')
    private environment: any,
    private http: HttpClient,
  ) {}

  public loadAndStoreRestaurants(): Observable<Restaurant[]> {
    const url = `${this.environment.apiEndpoint}/restaurants`;

    return this.http.get<Restaurant[]>(url).pipe(
      tap(restaurants => setRestaurants(restaurants)));
  }

}
