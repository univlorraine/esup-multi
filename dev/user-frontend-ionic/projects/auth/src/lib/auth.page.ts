import { Component, OnDestroy, OnInit } from '@angular/core';
import { authenticatedUser$ } from '@ul/shared';
import { BehaviorSubject, Subscription } from 'rxjs';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.page.html',
  styleUrls: ['./auth.page.scss'],
})
export class AuthPage implements OnInit, OnDestroy {

  public authentified$ = new BehaviorSubject<boolean>(false);
  private authentifiedSubscription: Subscription;

  ngOnInit(): void {
    this.authentifiedSubscription = authenticatedUser$.pipe(
      map(authenticatedUser => !!authenticatedUser)
    ).subscribe(this.authentified$);
  }

  ngOnDestroy(): void {
    this.authentifiedSubscription?.unsubscribe();
  }
}
