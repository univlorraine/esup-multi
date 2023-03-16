import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { TranslatedChannel } from '../../notifications.repository';
import { NotificationsService } from '../../notifications.service';
import { catchError, finalize, first } from 'rxjs/operators';
import { FormControl } from '@angular/forms';
import { Subscription } from 'rxjs';

export interface ChannelSubscription extends TranslatedChannel {
  subscribed: boolean;
}

@Component({
  selector: 'app-channel-subscription',
  templateUrl: './channel-subscription.component.html',
  styleUrls: ['./channel-subscription.component.scss'],
})
export class ChannelSubscriptionComponent implements OnInit, OnDestroy {
  @Input() channelSubscription: ChannelSubscription;
  form: FormControl;
  private formSubscription: Subscription;

  constructor(
    private notificationsService: NotificationsService
  ) {}

  ngOnInit(): void {
    this.form = new FormControl<boolean>(this.channelSubscription.subscribed);
    this.formSubscription = this.form.valueChanges.subscribe(checked => this.onToggle(checked));
  }

  ngOnDestroy(): void {
    this.formSubscription?.unsubscribe();
  }

  private onToggle(checked: boolean) {
    this.form.disable({ emitEvent: false});
    this.notificationsService.subscribeOrUnsubscribeUserToChannel({
          isSubscription: checked,
          channelCode: this.channelSubscription.code,
    }).pipe(
      first(),
      catchError(err => {
        this.form.setValue(!checked, {emitEvent: false});
        throw err;
      }),
      finalize(() => this.form.enable({ emitEvent: false}))
    ).subscribe();
  }
}
