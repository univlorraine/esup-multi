import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { StaticPage, StaticPagesRepository } from './static-pages.repository';

@Injectable({
  providedIn: 'root'
})
export class StaticPagesService {

  constructor(
    @Inject('environment')
    private environment: any,
    private http: HttpClient,
    private staticPagesRepository: StaticPagesRepository
    ) { }

  public loadAndStoreStaticPages(): Observable<StaticPage[]> {
    const url = `${this.environment.apiEndpoint}/static-pages`;

    return this.http.get<StaticPage[]>(url).pipe(
      tap((staticPages) => {
        this.staticPagesRepository.setStaticPages(staticPages);
      }));;
  }
}
