import { Inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Marker } from './map.repository';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class MapService {


  constructor(
    @Inject('environment')
    private environment: any,
    private http: HttpClient
  ) { }

  getMarkers(): Observable<Marker[]> {
    return this.http.get<Marker[]>(`${this.environment.apiEndpoint}/map`);
  }
}
