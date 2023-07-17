import { AfterViewInit, ChangeDetectorRef, Component, Input, OnInit } from '@angular/core';
import { getExpectedErrorMessage, ThemeService } from '@ul/shared';
import { Observable } from 'rxjs';
import { catchError, finalize, take } from 'rxjs/operators';
import { Clocking, clocking$ } from '../../clocking.repository';
import { ClockingService } from '../../clocking.service';

@Component({
  selector: 'app-clocking-widget',
  templateUrl: './clocking.component.html',
  styleUrls: ['./clocking.component.scss'],
})
export class ClockingComponent implements OnInit, AfterViewInit {

  @Input() widgetColor: string;

  public isLoading = false;
  public clocking$: Observable<Clocking> = clocking$;
  public clockInLoading = false;
  public errorMessage: string | null = null;

  constructor(private clockingService: ClockingService,
    private themeService: ThemeService,
    private changeDetectorRef: ChangeDetectorRef) { }

  ngOnInit(): void {
    this.isLoading = true;
    this.clockingService.loadClockingIfNetworkAvailable()
      .pipe(
        take(1),
        catchError(err => this.catchExpectedError(err)),
        finalize(() => this.isLoading = false)
      )
      .subscribe(() => this.errorMessage = null);
  }

  ngAfterViewInit() {
    this.changeDetectorRef.detectChanges();
  }

  onClockIn(event: MouseEvent) {
    event.stopPropagation(); // prevent from triggering card click

    this.clockInLoading = true;
    this.clockingService.clockIn().pipe(
      take(1),
      catchError(err => this.catchExpectedError(err)),
      finalize(() => this.clockInLoading = false)
    )
    .subscribe(() => this.errorMessage = null);
  }

  fontColor() {
    return this.themeService.isBackgroundFromCmsDarkOrIsDarkTheme(this.widgetColor) ?
      'light-font-color' : 'dark-font-color';
  }

  private catchExpectedError(err) {
    this.errorMessage = getExpectedErrorMessage(err);
    if (!this.errorMessage) {
      throw err;
    }
    return null;
  }
}
