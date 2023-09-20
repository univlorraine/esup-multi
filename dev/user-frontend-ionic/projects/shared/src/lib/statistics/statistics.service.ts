import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { Device } from '@capacitor/device';
import { Platform } from '@ionic/angular';
import { combineLatest, from, Observable, of } from 'rxjs';
import { catchError, switchMap, take } from 'rxjs/operators';
import { getAuthToken } from '../auth/auth.repository';
import { NetworkService } from '../network/network.service';

interface UserActionRequestData {
  authToken: string;
  data: {
    duid: string | null;
    action: string;
    functionality: string;
    platform: string | null;
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
    private platform: Platform
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

    return combineLatest([getAuthToken(), from(Device.getId()), from(this.networkService.getConnectionStatus())]).pipe(
      take(1),
      switchMap(([authToken, deviceId, connectionStatus]) => {
        const data: UserActionRequestData = {
          authToken,
          data: {
            duid: deviceId.identifier,
            action: userActionDetails.action,
            functionality: userActionDetails.functionality,
            platform: this.platform.platforms().join(','),
            connectionType: connectionStatus.connectionType
          }
        };

        return this.http.post<void>(url, data);
      }),
      catchError(() => of(null))
    );
  }
}
