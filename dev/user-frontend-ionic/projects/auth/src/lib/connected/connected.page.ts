import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticatedUser, authenticatedUser$ } from '@ul/shared';
import { Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';
import { AuthService } from '../../public-api';

@Component({
  selector: 'app-connected',
  templateUrl: './connected.page.html',
  styleUrls: ['./connected.page.scss'],
})
export class ConnectedPage implements OnInit {

  authenticatedUser$: Observable<AuthenticatedUser>;
  public isLoading = false;

  constructor(
    private authService: AuthService,
    private router: Router,
  ) { }

  ngOnInit() {
    this.authenticatedUser$ = authenticatedUser$;
  }

  logout() {
    this.isLoading = true;
    this.authService.logout()
      .pipe(
        finalize(() => this.isLoading = false)
      )
      .subscribe(
        () => {
          this.router.navigate(['auth','login']);
        }
      );
  }
}
