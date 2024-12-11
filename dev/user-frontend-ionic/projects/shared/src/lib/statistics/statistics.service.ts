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

import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { combineLatest, from, Observable, of } from 'rxjs';
import { catchError, switchMap, take } from 'rxjs/operators';
import { getAuthToken } from '../auth/auth.repository';
import { NetworkService } from '../network/network.service';
import { Capacitor } from '@capacitor/core';
import { statsUid$, updateStatsUid } from './statistics.repository';

interface UserActionRequestData {
  authToken: string;
  data: {
    duid: string | null;
    action: string;
    functionality: string;
    platform: string;
    connectionType: string;
  };
}

interface UserActionDetails {
  action: 'OPEN';
  functionality: string;
}

@Injectable({
  providedIn: 'root'
})
export class StatisticsService {
  constructor(
    @Inject('environment')
    private environment: any,
    private http: HttpClient,
    private networkService: NetworkService,
  ) {}

  public async onFunctionalityOpened(statisticName: string) {
    if(!statisticName) {
      return;
    }

    if (!(await this.networkService.getConnectionStatus()).connected) {
      return;
    }

    this.postUserActionStatistic({
      action: 'OPEN',
      functionality: statisticName
    }).subscribe();
  }

  private postUserActionStatistic(userActionDetails: UserActionDetails): Observable<void> {
    const url = `${this.environment.apiEndpoint}/statistics/user-action`;

    return combineLatest([getAuthToken(), statsUid$, from(this.networkService.getConnectionStatus())]).pipe(
      take(1),
      switchMap(([authToken, statsUid, connectionStatus]) => {
        const data: UserActionRequestData = {
          authToken,
          data: {
            duid: statsUid,
            action: userActionDetails.action,
            functionality: userActionDetails.functionality,
            platform: Capacitor.getPlatform(),
            connectionType: connectionStatus.connectionType
          }
        };

        return this.http.post<void>(url, data);
      }),
      catchError(() => of(null))
    );
  }

  // Generate a unique id for stats usage and store it in Local Storage
  public async checkAndGenerateStatsUid() {
    statsUid$.pipe(take(1)).subscribe((uid) => {
      if (!uid) {
        updateStatsUid(this.uuid4());
      }
    });
  }

  private uuid4() {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(
      /[xy]/g,
      function (c) {
        const r = (Math.random() * 16) | 0,
          v = c === 'x' ? r : (r & 0x3) | 0x8;
        return v.toString(16);
      },
    );
  }
}
