import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { LoginPageContent, LoginRepository } from './login.repository';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  constructor(
    @Inject('environment')
    private environment: any,
    private http: HttpClient,
    private loginRepository: LoginRepository) { }

  public loadAndStoreLoginPageContent(): Observable<LoginPageContent> {
    const url = `${this.environment.apiEndpoint}/auth/login-page-content`;

    return this.http.get<LoginPageContent>(url).pipe(
      tap((pageContent) => {
        this.loginRepository.setPageContent(pageContent);
      }));
  }
}
