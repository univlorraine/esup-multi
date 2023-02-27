import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { Network } from '@capacitor/network';
import { getAuthToken } from '@ul/shared';
import { from, iif, Observable, of } from 'rxjs';
import { first, map, switchMap, tap } from 'rxjs/operators';
import { Clocking, setClocking } from './clocking.repository';

@Injectable({
  providedIn: 'root'
})
export class ClockingService {

  constructor(
    @Inject('environment')
    private environment: any,
    private http: HttpClient,
  ) {}

  public loadClockingIfNetworkAvailable(): Observable<void> {
    return from(Network.getStatus()).pipe(
      switchMap(status => iif(
        () => status.connected,
        this.getAndStoreClocking(),
        of(null),
      )),
    );
  }

  public clockIn(): Observable<void> {
    return this.addClocking().pipe(
      tap(clocking => setClocking(clocking)),
      map(() => null)
    );
  }

  private getClocking(): Observable<Clocking> {
    const url = `${this.environment.apiEndpoint}/clocking`;
    return getAuthToken().pipe(
      first(),
      switchMap(authToken => this.http.post<Clocking>(url, { authToken }))
    );
  }

  private getAndStoreClocking(): Observable<void> {
    return this.getClocking().pipe(
      tap(clocking => setClocking(clocking)),
      map(() => null)
    );
  }

  private addClocking(): Observable<Clocking> {
    const url = `${this.environment.apiEndpoint}/clock-in`;
    return getAuthToken().pipe(
      first(),
      switchMap(authToken => this.http.post<Clocking>(url, { authToken }))
    );
  }
}
