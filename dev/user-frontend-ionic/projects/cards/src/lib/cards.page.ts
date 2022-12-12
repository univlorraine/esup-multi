import { Component } from '@angular/core';
import { AuthenticatedUser, authenticatedUser$ } from '@ul/shared';
import { setUserAndCardsData, UserAndCardsData, userAndCardsData$ } from './cards.repository';

import { Network } from '@capacitor/network';
import { Observable, Subscription } from 'rxjs';
import { filter, finalize, first, switchMap } from 'rxjs/operators';
import { CardsService } from './cards.service';
import { ScreenService } from './screen.service';

@Component({
  selector: 'app-cards',
  templateUrl: './cards.page.html',
  styleUrls: ['./cards.page.scss']
})
export class CardsPage {

  public authenticatedUser$: Observable<AuthenticatedUser>;
  public userAndCardsData$: Observable<UserAndCardsData> = userAndCardsData$;
  public isLoading = false;
  private userAndCardsDataSubscription: Subscription;

  constructor(
    private cardsService: CardsService,
    private screenService: ScreenService,
  ) {}

  ionViewWillEnter() {
    this.userAndCardsDataSubscription = userAndCardsData$.subscribe(userAndCardsData => {
      if (
        userAndCardsData &&
        userAndCardsData.cards.staffCard &&
        !userAndCardsData.errors
      ) {
        this.screenService.fullBrightness();
      }
    });

    this.loadUserCardsData();
  }

  ionViewWillLeave() {
    this.userAndCardsDataSubscription?.unsubscribe();
    this.screenService.restorePreviousBrightness();
  }

  private async loadUserCardsData() {
    if (!(await Network.getStatus()).connected) {
      return;
    }

    this.isLoading = true;
    authenticatedUser$.pipe(
      first(),
      filter(authenticatedUser => authenticatedUser != null),
      switchMap(authenticatedUser => this.cardsService.getUserAndCardsData(authenticatedUser.authToken)),
      finalize(() => this.isLoading = false)
    ).subscribe(userAndCardsData => {
      setUserAndCardsData(userAndCardsData);
    });
  }
}





