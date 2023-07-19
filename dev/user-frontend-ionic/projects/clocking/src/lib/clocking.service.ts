import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { getAuthToken, NetworkService } from '@ul/shared';
import { from, iif, Observable, of } from 'rxjs';
import { map, switchMap, take, tap } from 'rxjs/operators';
import { Clocking, setClocking } from './clocking.repository';

@Injectable({
  providedIn: 'root'
})
export class ClockingService {

  constructor(
    @Inject('environment')
    private environment: any,
    private http: HttpClient,
    private networkService: NetworkService,
  ) {}

  public loadClockingIfNetworkAvailable(): Observable<void> {
    return from(this.networkService.getConnectionStatus()).pipe(
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
      take(1),
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
      take(1),
      switchMap(authToken => this.http.post<Clocking>(url, { authToken }))
    );
  }
}
