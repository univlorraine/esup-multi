import { Inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Tile } from './tiles.repository';

@Injectable({
  providedIn: 'root'
})
export class TilesService {

  constructor(
    @Inject('environment')
    private environment: any,
    private http: HttpClient,
  ) {}

  public getTiles(authToken: string): Observable<Tile[]> {
    const url = `${this.environment.apiEndpoint}/tiles`;
    const data = {
      authToken
    };

    return this.http.post<Tile[]>(url, data);
  }
}
