import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Info } from './info.repository';

@Injectable({
  providedIn: 'root'
})
export class InfoService {

  constructor(
    @Inject('environment')
    private environment: any,
    private http: HttpClient
  ) {}

  getInfoList(): Observable<Info[]> {
    return this.http.get<Info[]>(`${this.environment.apiEndpoint}/info`);
  }
}
