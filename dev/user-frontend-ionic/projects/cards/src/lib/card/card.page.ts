import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Network } from '@capacitor/network';
import { authenticatedUser$ } from '@ul/shared';
import { Observable } from 'rxjs';
import { filter, finalize, first, switchMap } from 'rxjs/operators';
import { setUserAndCardsData, UserAndCardsData, userAndCardsData$ } from '../cards.repository';
import { CardsService } from '../cards.service';
import { ScreenService } from '../screen.service';


@Component({
  selector: 'app-card',
  templateUrl: './card.page.html',
  styleUrls: ['./card.page.scss']
})
export class CardPage implements OnInit {

  public userAndCardsData$: Observable<UserAndCardsData> = userAndCardsData$;
  public cardType: string;
  public isLoading = false;

  constructor(
    private route: ActivatedRoute,
    private cardsService: CardsService,
    private screenService: ScreenService,
  ) {
  }

  ngOnInit() {
    this.cardType = this.route.snapshot.paramMap.get('type');
  }

  async ionViewWillEnter() {
    this.loadUserAndCardsData();
  }

  ionViewDidEnter() {
    this.screenService.fullBrightness();
  }

  ionViewWillLeave() {
    this.screenService.restorePreviousBrightness();
  }

  private async loadUserAndCardsData() {
    if (!(await Network.getStatus()).connected) {
      return;
    }

    this.isLoading = true;
    authenticatedUser$.pipe(
      first(),
      filter(authenticatedUser => authenticatedUser != null),
      switchMap(authenticatedUser => this.cardsService.getUserAndCardsData(authenticatedUser.authToken)),
      finalize(() => this.isLoading = false)
    ).subscribe(data => {
      setUserAndCardsData(data);
    });
  }



}

