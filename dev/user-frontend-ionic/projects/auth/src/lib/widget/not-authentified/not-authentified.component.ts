import { Component, OnInit } from '@angular/core';
import { AuthenticatedUser, authenticatedUser$ } from '@ul/shared';
import { Observable } from 'rxjs';
@Component({
  selector: 'app-auth-not-authentified-widget',
  templateUrl: './not-authentified.component.html',
  styleUrls: ['./not-authentified.component.scss'],
})
export class NotAuthentifiedComponent implements OnInit {
  authenticatedUser$: Observable<AuthenticatedUser>;

  constructor(
  ) { }

  ngOnInit() {
    this.authenticatedUser$ = authenticatedUser$;
  }
}
