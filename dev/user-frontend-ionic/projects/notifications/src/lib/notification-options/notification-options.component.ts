import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Platform } from '@ionic/angular';
import { combineLatest, Observable } from 'rxjs';
import { map, take } from 'rxjs/operators';
import { Notification, NotificationsRepository, TranslatedChannel } from '../notifications.repository';
import { NotificationsService } from '../notifications.service';
import { ToastService } from '../toast.service';

interface NotificationOptions {
  filterable: boolean;
  channel: TranslatedChannel;
  isSubscribed: boolean;
}

@Component({
  selector: 'app-notification-options',
  templateUrl: './notification-options.component.html',
  styleUrls: ['./notification-options.component.scss'],
})
export class NotificationOptionsComponent {

  @Input() notification: Notification;
  @Output() closeModal: EventEmitter<void> = new EventEmitter<void>();

  public notifications$: Observable<Notification[]>;
  public notificationOptions$: Observable<NotificationOptions>;
  unsubscribedChannelsCodes: string[] = [];

  constructor(public platform: Platform,
    private notificationsService: NotificationsService,
    public notificationRepository: NotificationsRepository,
    private toastService: ToastService,
  ) {

    this.notificationOptions$ = combineLatest([
      this.notificationRepository.translatedChannels$,
      this.notificationRepository.unsubscribedChannels$,
    ]).pipe(
      map(([channels, unsubscribedChannels]) => {
        const channel = channels.find((c) => c.code === this.notification.channel);
        const isSubscribed = !unsubscribedChannels.includes(this.notification.channel);
        this.unsubscribedChannelsCodes = unsubscribedChannels;
        return {
          filterable: channels.some(c => c.code === this.notification.channel && channel.filterable),
          channel,
          isSubscribed,
        };
      })
    );
  }

  deleteNotification(id: string) {
    this.notificationsService.deleteNotification(id)
      .pipe(
        take(1),
      ).subscribe(async () => {
        this.notificationRepository.deletNotification(id);
        this.toastService.displayToast('NOTIFICATIONS.ALERT.DELETED');
        this.closeModal.emit();
      });
  }

  onSubscribeToChannel(channel: TranslatedChannel){
    this.onSubscribeOrUnsubscribeChannelClick(channel, true);
  }

  onUnsubscribeFromChannel(channel: TranslatedChannel){
    this.onSubscribeOrUnsubscribeChannelClick(channel, false);
  }

  private onSubscribeOrUnsubscribeChannelClick(channel: TranslatedChannel, isSubscription: boolean) {
    if (isSubscription === !this.unsubscribedChannelsCodes.includes(channel.code)) {
      return;
    } else if (isSubscription) {
      this.unsubscribedChannelsCodes = this.unsubscribedChannelsCodes.filter(
        (unsubscribedChannelCode: string) => unsubscribedChannelCode !== channel.code
      );
    } else {
      this.unsubscribedChannelsCodes.push(channel.code);
    }

    this.notificationsService.subscribeOrUnsubscribeUserToChannels({
      channelCodes: this.unsubscribedChannelsCodes
    }).pipe(
      take(1)
    ).subscribe(async (status) => {
      if (isSubscription) {
        this.notificationRepository.subscribeChannel(channel.code);
        this.toastService.displayToast('NOTIFICATIONS.ALERT.CHANNEL.SUBSCRIBED', channel.label);
      } else {
        this.notificationRepository.unsubscribeChannel(channel.code);
        this.toastService.displayToast('NOTIFICATIONS.ALERT.CHANNEL.UNSUBSCRIBED', channel.label);
      }
    });
  }
}
