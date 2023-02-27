import { Component, OnInit } from '@angular/core';
import { getExpectedErrorMessage } from '@ul/shared';
import { Observable } from 'rxjs';
import { finalize, first, catchError } from 'rxjs/operators';
import { Clocking, clocking$ } from '../../clocking.repository';
import { ClockingService } from '../../clocking.service';

@Component({
  selector: 'app-clocking-widget',
  templateUrl: './clocking.component.html',
  styleUrls: ['./clocking.component.scss'],
})
export class ClockingComponent implements OnInit {

  public isLoading = false;
  public clocking$: Observable<Clocking> = clocking$;
  public clockInLoading = false;
  public errorMessage: string | null = null;

  constructor(private clockingService: ClockingService) { }

  ngOnInit(): void {
    this.isLoading = true;
    this.clockingService.loadClockingIfNetworkAvailable()
      .pipe(
        first(),
        catchError(err => this.catchExpectedError(err)),
        finalize(() => this.isLoading = false)
      )
      .subscribe(() => this.errorMessage = null);
  }

  onClockIn(event: MouseEvent) {
    event.stopPropagation(); // prevent from triggering card click

    this.clockInLoading = true;
    this.clockingService.clockIn().pipe(
      first(),
      catchError(err => this.catchExpectedError(err)),
      finalize(() => this.clockInLoading = false)
    )
    .subscribe(() => this.errorMessage = null);
  }

  private catchExpectedError(err) {
    this.errorMessage = getExpectedErrorMessage(err);
    if (!this.errorMessage) {
      throw err;
    }
    return null;
  }
}
