import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { App } from '@capacitor/app';
import { Capacitor } from '@capacitor/core';
import { Platform } from '@ionic/angular';
import { getAuthToken, NetworkService } from '@ul/shared';
import { combineLatest, from, Observable, of } from 'rxjs';
import { map, switchMap, take, tap } from 'rxjs/operators';
import { ContactUsPageContent, ContactUsRepository } from './contact-us.repository';

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
    private networkService: NetworkService,
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
    return combineLatest([getAuthToken(), appVersion, from(this.networkService.getConnectionStatus())]).pipe(
      take(1),
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
