import { HttpClient, HttpParams } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { Menu, upsertMenus } from './menus.repository';


@Injectable({
  providedIn: 'root'
})
export class RestaurantMenusService {

  constructor(
    @Inject('environment')
    private environment: any,
    private http: HttpClient,
  ) { }

  public loadAndStoreMenus(restaurantId: number, date?: string): Observable<Menu[]> {
    const url = `${this.environment.apiEndpoint}/restaurant/menus`;
    const params = new HttpParams()
      .set('id', restaurantId)
      .set('date', date || '');

    return this.http.get<Menu[]>(url, { params }).pipe(
      tap(menus => upsertMenus(
        // @TODO supprimer le '.map' une fois l'API de l'UL en place
        // eslint-disable-next-line @typescript-eslint/naming-convention
        menus.map(m => ({...m, restaurant_id : restaurantId})))
      )
    );
  }
}
