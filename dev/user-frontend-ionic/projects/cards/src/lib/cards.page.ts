/*
 * Copyright ou © ou Copr. Université de Lorraine, (2022)
 *
 * Direction du Numérique de l'Université de Lorraine - SIED
 *  (dn-mobile-dev@univ-lorraine.fr)
 * JNESIS (contact@jnesis.com)
 *
 * Ce logiciel est un programme informatique servant à rendre accessible
 * sur mobile divers services universitaires aux étudiants et aux personnels
 * de l'université.
 *
 * Ce logiciel est régi par la licence CeCILL 2.1, soumise au droit français
 * et respectant les principes de diffusion des logiciels libres. Vous pouvez
 * utiliser, modifier et/ou redistribuer ce programme sous les conditions
 * de la licence CeCILL telle que diffusée par le CEA, le CNRS et INRIA
 * sur le site "http://cecill.info".
 *
 * En contrepartie de l'accessibilité au code source et des droits de copie,
 * de modification et de redistribution accordés par cette licence, il n'est
 * offert aux utilisateurs qu'une garantie limitée. Pour les mêmes raisons,
 * seule une responsabilité restreinte pèse sur l'auteur du programme, le
 * titulaire des droits patrimoniaux et les concédants successifs.
 *
 * À cet égard, l'attention de l'utilisateur est attirée sur les risques
 * associés au chargement, à l'utilisation, à la modification et/ou au
 * développement et à la reproduction du logiciel par l'utilisateur étant
 * donné sa spécificité de logiciel libre, qui peut le rendre complexe à
 * manipuler et qui le réserve donc à des développeurs et des professionnels
 * avertis possédant des connaissances informatiques approfondies. Les
 * utilisateurs sont donc invités à charger et à tester l'adéquation du
 * logiciel à leurs besoins dans des conditions permettant d'assurer la
 * sécurité de leurs systèmes et/ou de leurs données et, plus généralement,
 * à l'utiliser et à l'exploiter dans les mêmes conditions de sécurité.
 *
 * Le fait que vous puissiez accéder à cet en-tête signifie que vous avez
 * pris connaissance de la licence CeCILL 2.1, et que vous en avez accepté les
 * termes.
 */

import { Component, Inject, ViewChild } from '@angular/core';
import { AuthenticatedUser, getAuthToken, NetworkService } from '@multi/shared';
import { Observable, Subscription } from 'rxjs';
import { filter, finalize, switchMap, take } from 'rxjs/operators';
import { CardModalComponent } from './card/card-modal.component';
import { CardsModuleConfig, CARDS_CONFIG } from './cards.config';
import { setUserAndCardsData, UserAndCardsData, userAndCardsData$ } from './cards.repository';
import { CardsService } from './cards.service';
import { ScreenService } from './screen.service';

@Component({
  selector: 'app-cards',
  templateUrl: './cards.page.html',
  styleUrls: ['../../../../src/theme/app-theme/styles/cards/cards.page.scss']
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
        userAndCardsData.cards?.staffCard &&
        (!userAndCardsData.errors || userAndCardsData.errors.length === 0)
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

  getCardTitle(card) {
    return card.value.title as string;
  }

  private async loadUserCardsData() {
    if (!(await this.networkService.getConnectionStatus()).connected){
      return;
    }

    this.isLoading = true;
    getAuthToken().pipe(
      take(1),
      filter(authToken => authToken != null),
      switchMap(authToken => this.cardsService.getUserAndCardsData(authToken)),
      finalize(() => this.isLoading = false)
    ).subscribe(userAndCardsData => {
      setUserAndCardsData(userAndCardsData);
    });
  }
}
