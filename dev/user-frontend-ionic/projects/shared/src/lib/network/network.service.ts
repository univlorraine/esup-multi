import { Injectable } from '@angular/core';
import { ConnectionStatus, Network } from '@capacitor/network';

@Injectable({
  providedIn: 'root'
})
export class NetworkService {

  constructor() { }

  async getConnectionStatus(): Promise<ConnectionStatus> {
    const status: ConnectionStatus = await Network.getStatus();
    if (status.connectionType === 'unknown') {
      status.connected = true;
    }
    return status;
  }
}
