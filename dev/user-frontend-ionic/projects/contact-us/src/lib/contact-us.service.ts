import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { ContactUsPageContent, ContactUsRepository } from './contact-us.repository';
import { Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';

export interface ContactMessageQueryDto {
  from: string;
  subject: string;
  text: string;
}

@Injectable({
  providedIn: 'root'
})
export class ContactUsService {

  constructor(
    @Inject('environment')
    private environment: any,
    private http: HttpClient,
    private contactUsRepository: ContactUsRepository
    ) { }

  public loadAndStoreContactUsPageContent(): Observable<ContactUsPageContent> {
    const url = `${this.environment.apiEndpoint}/contact-us`;

    return this.http.get<ContactUsPageContent>(url).pipe(
      tap((pageContent) => {
        this.contactUsRepository.setPageContent(pageContent);
      }));
  }

  public sendContactMessage(query: ContactMessageQueryDto): Observable<void> {
    const url = `${this.environment.apiEndpoint}/contact-us`;

    return this.http.post<void>(url, query).pipe(
      map(() => void 0)
    );
  }
}
