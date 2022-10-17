import { Inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Info } from './info.repository';
import { Observable } from 'rxjs';

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
