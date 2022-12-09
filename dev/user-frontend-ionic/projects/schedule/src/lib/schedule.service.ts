import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Schedule } from './schedule.repository';

@Injectable({
  providedIn: 'root'
})
export class ScheduleService {

  constructor(
    @Inject('environment')
    private environment: any,
    private http: HttpClient,
  ) {
  }

  public getSchedule(authToken: string, startDate: string, endDate: string): Observable<Schedule> {

    const url = `${this.environment.apiEndpoint}/schedule`;
    const data = {
      authToken,
      startDate,
      endDate
    };

    return this.http.post<Schedule>(url, data);
  }

}
