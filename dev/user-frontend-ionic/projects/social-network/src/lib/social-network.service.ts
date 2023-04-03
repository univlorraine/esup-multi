import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { setSocialNetworks, SocialNetwork } from './social-network.repository';

@Injectable({
  providedIn: 'root'
})
export class SocialNetworkService {

  constructor(
    @Inject('environment')
  private environment: any,
  private http: HttpClient) { }
  public loadAndStoreSocialNetworks(): Observable<SocialNetwork[]> {
    const url = `${this.environment.apiEndpoint}/social-network`;

    return this.http.get<SocialNetwork[]>(url).pipe(
      tap(socialNetworks => setSocialNetworks(socialNetworks)));
  }
}
