import { Component, OnInit } from '@angular/core';
import { finalize, first } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { UnreadMailService } from '../../unread-mail.service';
import { mails$, MailCalendar } from '../../unread-mail.repository';

@Component({
  selector: 'app-unread-mail-widget',
  templateUrl: './unread-mail.component.html',
  styleUrls: ['./unread-mail.component.scss'],
})
export class UnreadMailComponent implements OnInit {
  public isLoading = false;
  public mails$: Observable<MailCalendar> = mails$;

  constructor(private unreadMailService: UnreadMailService) {
  }

  ngOnInit(): void {
    this.isLoading = true;
    this.unreadMailService.loadUnreadMailIfNetworkAvailable()
      .pipe(
        first(),
        finalize(() => this.isLoading = false)
      )
      .subscribe();
  }
}
