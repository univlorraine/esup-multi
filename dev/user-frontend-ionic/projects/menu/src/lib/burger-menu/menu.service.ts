import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { SocialNetwork } from './social-network.repository';

@Injectable({
  providedIn: 'root'
})
export class MenuService {

  constructor(
    @Inject('environment')
    private environment: any,
    private http: HttpClient,) { }

  public getSocialNetworks(): Observable<SocialNetwork[]> {
    const url = `${this.environment.apiEndpoint}/social-network`;

    return this.http.get<SocialNetwork[]>(url);
  }
}
