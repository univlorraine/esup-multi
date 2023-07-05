import {Component, Inject, ViewChild} from '@angular/core';
import { AuthenticatedUser, getAuthToken, NetworkService } from '@ul/shared';
import { Observable, Subscription } from 'rxjs';
import { filter, finalize, first, switchMap } from 'rxjs/operators';
import { CardModalComponent } from './card/card-modal.component';
import { setUserAndCardsData, UserAndCardsData, userAndCardsData$ } from './cards.repository';
import { CardsService } from './cards.service';
import { ScreenService } from './screen.service';
import { CARDS_CONFIG, CardsModuleConfig } from './cards.config';

@Component({
  selector: 'app-cards',
  templateUrl: './cards.page.html',
  styleUrls: ['./cards.page.scss']
})
export class CardsPage {
  @ViewChild(CardModalComponent) cardModalComponent: CardModalComponent;
  public authenticatedUser$: Observable<AuthenticatedUser>;
  public userAndCardsData$: Observable<UserAndCardsData> = userAndCardsData$;
  public isLoading = false;
  private userAndCardsDataSubscription: Subscription;


  constructor(
    private cardsService: CardsService,
    private screenService: ScreenService,
    private networkService: NetworkService,
    @Inject(CARDS_CONFIG) private config: CardsModuleConfig,
  ) {}

  openModal(cardType) {
    this.cardModalComponent.openModal(cardType);
  }

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

  hasKnownError(errors: string[]) {
    const commonErrors = errors.filter(error => this.isKnownError(error));
    return commonErrors.length > 0;
  }

  isKnownError(error: string) {
    return this.config.knownErrors.includes(error);
  }

  private async loadUserCardsData() {
    if (!(await this.networkService.getConnectionStatus()).connected){
      return;
    }

    this.isLoading = true;
    getAuthToken().pipe(
      first(),
      filter(authToken => authToken != null),
      switchMap(authToken => this.cardsService.getUserAndCardsData(authToken)),
      finalize(() => this.isLoading = false)
    ).subscribe(userAndCardsData => {
      setUserAndCardsData(userAndCardsData);
    });
  }
}





