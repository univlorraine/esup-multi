import { Injectable, NgZone } from '@angular/core';
import { ConnectionStatus, Network } from '@capacitor/network';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NetworkService {
  public isOnline$: Observable<boolean>;
  private isOnlineStatusSubject = new BehaviorSubject<boolean>(false);

  constructor(private zone: NgZone) {
    this.isOnline$ = this.isOnlineStatusSubject.asObservable();
    this.initIsOnline();
    this.initNetworkStatusListener();
  }

  async getConnectionStatus(): Promise<ConnectionStatus> {
    const status: ConnectionStatus = await Network.getStatus();
    if (status.connectionType === 'unknown') {
      status.connected = true;
    }
    return status;
  }

  private async initIsOnline() {
    const status = await this.getConnectionStatus();
    this.isOnlineStatusSubject.next(status.connected);
    this.isOnline$ = this.isOnlineStatusSubject.asObservable();
  }

  private initNetworkStatusListener() {
    Network.addListener('networkStatusChange', (status) => {
      this.zone.run(() => {
        if (status.connectionType === 'unknown') {
          status.connected = true;
        }
        this.isOnlineStatusSubject.next(status.connected);
      });
    });
  }

}
