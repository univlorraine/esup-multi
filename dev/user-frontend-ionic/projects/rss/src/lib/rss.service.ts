import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { FeedItem } from './rss.repository';

@Injectable({
  providedIn: 'root'
})
export class RssService {

  constructor(
    @Inject('environment')
    private environment: any,
    private http: HttpClient
  ) {}

  public getRssFeed(): Observable<FeedItem[]> {
    return this.http.get<FeedItem[]>(`${this.environment.apiEndpoint}/rss`);
  }
}
