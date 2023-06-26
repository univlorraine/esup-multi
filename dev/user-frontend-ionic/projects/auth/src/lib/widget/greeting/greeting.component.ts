import { Component, OnInit } from '@angular/core';
import { AuthenticatedUser, authenticatedUser$ } from '@ul/shared';
import { Observable } from 'rxjs';
@Component({
  selector: 'app-auth-greeting-widget',
  templateUrl: './greeting.component.html',
  styleUrls: ['./greeting.component.scss'],
})
export class GreetingComponent implements OnInit {
  authenticatedUser$: Observable<AuthenticatedUser>;

  constructor() {}

  ngOnInit() {
    this.authenticatedUser$ = authenticatedUser$;
  }
}
