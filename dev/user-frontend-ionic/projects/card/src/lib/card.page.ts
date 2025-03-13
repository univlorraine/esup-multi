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

import { Component, Inject } from '@angular/core';
import { AuthenticatedUser, getAuthToken, NetworkService } from '@multi/shared';
import { Observable, Subscription } from 'rxjs';
import { filter, finalize, switchMap, take } from 'rxjs/operators';
import { CardModuleConfig, CARD_CONFIG } from './card.config';
import { setUserAndCardData, UserAndCardData, userAndCardData$ } from './card.repository';
import { CardService } from './card.service';
import { ScreenService } from './screen.service';

@Component({
  selector: 'app-card',
  templateUrl: './card.page.html',
  styleUrls: ['../../../../src/theme/app-theme/styles/cards/card/card.page.scss']
})
export class CardPage {
  public authenticatedUser$: Observable<AuthenticatedUser>;
  public userAndCardData$: Observable<UserAndCardData> = userAndCardData$;
  public isLoading = false;
  private userAndCardDataSubscription: Subscription;


  constructor(
    private cardService: CardService,
    private screenService: ScreenService,
    private networkService: NetworkService,
    @Inject(CARD_CONFIG) private config: CardModuleConfig,
  ) {}

  ionViewWillEnter() {
    this.userAndCardDataSubscription = userAndCardData$.subscribe(userAndCardData => {
      if (
        userAndCardData  &&
        (!userAndCardData.errors || userAndCardData.errors.length === 0)
      ) {
        this.screenService.fullBrightness();
      }
    });

    this.loadUserCardData();
  }

  ionViewWillLeave() {
    this.userAndCardDataSubscription?.unsubscribe();
    this.screenService.restorePreviousBrightness();
  }

  hasErrors(userCard: any): boolean {
    return userCard.errors && userCard.errors.length > 0;
  }

  isKnownError(error: string) {
    return this.config.knownErrors.includes(error);
  }

  private async loadUserCardData() {
    if (!(await this.networkService.getConnectionStatus()).connected){
      return;
    }

    this.isLoading = true;
    getAuthToken().pipe(
      take(1),
      filter(authToken => authToken != null),
      switchMap(authToken => this.cardService.getUserAndCardData(authToken)),
      finalize(() => this.isLoading = false)
    ).subscribe(userAndCardData => {
      setUserAndCardData(userAndCardData);
    });
  }
}
