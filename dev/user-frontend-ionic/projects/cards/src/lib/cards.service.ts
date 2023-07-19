import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { UserAndCardsData } from './cards.repository';

@Injectable({
  providedIn: 'root'
})
export class CardsService {

  constructor(
    @Inject('environment')
    private environment: any,
    private http: HttpClient,
  ) {
  }

  public getUserAndCardsData(authToken: string): Observable<UserAndCardsData> {
    const url = `${this.environment.apiEndpoint}/cards`;
    const data = {
      authToken
    };

    return this.http.post<UserAndCardsData>(url, data);
  }
}
