import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { ContactUsPageContent, ContactUsRepository } from './contact-us.repository';
import { combineLatest, from, Observable, of } from 'rxjs';
import { first, map, switchMap, tap } from 'rxjs/operators';
import { getAuthToken } from '@ul/shared';
import { App } from '@capacitor/app';
import { Capacitor } from '@capacitor/core';
import { Network } from '@capacitor/network';
import { Platform } from '@ionic/angular';

export interface ContactMessageQueryDto {
  from: string;
  subject: string;
  text: string;
  userData?: {
    authToken: string;
    platform: string;
    appVersion: string;
    connectionType: string;
  };
}

@Injectable({
  providedIn: 'root'
})
export class ContactUsService {

  constructor(
    @Inject('environment')
    private environment: any,
    private http: HttpClient,
    private contactUsRepository: ContactUsRepository,
    private platform: Platform,
  ) {}

  public loadAndStoreContactUsPageContent(): Observable<ContactUsPageContent> {
    const url = `${this.environment.apiEndpoint}/contact-us`;

    return this.http.get<ContactUsPageContent>(url).pipe(
      tap((pageContent) => {
        this.contactUsRepository.setPageContent(pageContent);
      }));
  }

  public sendContactMessage(query: ContactMessageQueryDto): Observable<void> {
    const url = `${this.environment.apiEndpoint}/contact-us`;

    const appVersion = !Capacitor.isNativePlatform() ? of(null) : from(App.getInfo()).pipe(map(info => info.version));
    return combineLatest([getAuthToken(), appVersion, from(Network.getStatus())]).pipe(
      first(),
      switchMap(([authToken, version, connectionStatus]) => {
        query.userData = {
          authToken,
          platform: this.platform.platforms().join(','),
          appVersion: version,
          connectionType: connectionStatus.connectionType
        };

        return this.http.post<void>(url, query).pipe(
          map(() => void 0)
        );
      })
    );
  }
}
