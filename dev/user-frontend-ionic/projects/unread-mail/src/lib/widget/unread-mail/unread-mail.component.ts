import { AfterViewInit, ChangeDetectorRef, Component, Input, OnInit } from '@angular/core';
import { ThemeService } from '@ul/shared';
import { Observable } from 'rxjs';
import { finalize, take } from 'rxjs/operators';
import { MailCalendar, mails$ } from '../../unread-mail.repository';
import { UnreadMailService } from '../../unread-mail.service';

@Component({
  selector: 'app-unread-mail-widget',
  templateUrl: './unread-mail.component.html',
  styleUrls: ['./unread-mail.component.scss'],
})
export class UnreadMailComponent implements OnInit, AfterViewInit {

  @Input() widgetColor: string;

  public isLoading = false;
  public mails$: Observable<MailCalendar> = mails$;

  constructor(private unreadMailService: UnreadMailService,
    private themeService: ThemeService,
    private changeDetectorRef: ChangeDetectorRef) {
  }

  ngOnInit(): void {
    this.isLoading = true;
    this.unreadMailService.loadUnreadMailIfNetworkAvailable()
      .pipe(
        take(1),
        finalize(() => this.isLoading = false)
      )
      .subscribe();
  }

  ngAfterViewInit() {
    this.changeDetectorRef.detectChanges();
  }

  fontColor() {
    return this.themeService.isBackgroundFromCmsDarkOrIsDarkTheme(this.widgetColor) ?
      'light-font-color' : 'dark-font-color';
  }
}
