import { Component, OnInit } from '@angular/core';
import { AuthenticatedUser, authenticatedUser$ } from '@ul/shared';
import { Observable } from 'rxjs';
import { take } from 'rxjs/operators';
import { LoginRepository, TranslatedLoginPageContent } from '../../common/login.repository';
import { LoginService } from '../../common/login.service';
@Component({
  selector: 'app-auth-not-authentified-widget',
  templateUrl: './not-authentified.component.html',
  styleUrls: ['./not-authentified.component.scss'],
})
export class NotAuthentifiedComponent implements OnInit {
  authenticatedUser$: Observable<AuthenticatedUser>;

  public translatedPageContent$: Observable<TranslatedLoginPageContent>;

  constructor(
    private loginService: LoginService,
    private loginRepository: LoginRepository,
  ) {
    this.translatedPageContent$ = this.loginRepository.translatedPageContent$;
  }

  ngOnInit() {
    this.authenticatedUser$ = authenticatedUser$;
    this.loginService.loadAndStoreLoginPageContent()
      .pipe(take(1))
      .subscribe();
  }
}
