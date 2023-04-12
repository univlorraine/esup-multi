import { Component, OnInit } from '@angular/core';
import { AuthenticatedUser, authenticatedUser$ } from '@ul/shared';
import { Observable } from 'rxjs';
import { finalize, first } from 'rxjs/operators';
import { AuthService } from '../../common/auth.service';

@Component({
  selector: 'app-auth-widget',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss'],
})
export class AuthComponent implements OnInit {
  isLoading = false;
  authenticatedUser$: Observable<AuthenticatedUser>;

  constructor(
    private authService: AuthService,
  ) { }

  ngOnInit() {
    this.authenticatedUser$ = authenticatedUser$;
  }

  logout() {
    this.isLoading = true;
    this.authService.logout()
      .pipe(
        first(),
        finalize(() => this.isLoading = false),
      )
      .subscribe();
  }
}
