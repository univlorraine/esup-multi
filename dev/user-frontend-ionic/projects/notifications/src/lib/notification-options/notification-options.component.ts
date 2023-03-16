import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Platform } from '@ionic/angular';
import { combineLatest, Observable } from 'rxjs';
import { first, map } from 'rxjs/operators';
import { Notification, NotificationsRepository, TranslatedChannel } from '../notifications.repository';
import { NotificationsService } from '../notifications.service';

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

  constructor(public platform: Platform,
    private notificationsService: NotificationsService,
    public notificationRepository: NotificationsRepository
  ) {
    this.notificationOptions$ = combineLatest([
      this.notificationRepository.translatedChannels$,
      this.notificationRepository.unsubscribedChannels$,
    ]).pipe(
      map(([channels, unsubscribedChannels]) => {
        const channel = channels.find((c) => c.code === this.notification.channel);
        const isSubscribed = !unsubscribedChannels.includes(this.notification.channel);
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
        first(),
      ).subscribe(() => {
        this.notificationRepository.deletNotification(id);
        this.closeModal.emit();
      });
  }

  onSubscribeToChannel(channelCode: string){
    this.onSubscribeOrUnsubscribeChannelClick(channelCode, true);
  }

  onUnsubscribeFromChannel(channelCode: string){
    this.onSubscribeOrUnsubscribeChannelClick(channelCode, false);
  }

  private onSubscribeOrUnsubscribeChannelClick(channelCode: string, isSubscription: boolean) {
    this.notificationsService.subscribeOrUnsubscribeUserToChannel({
      isSubscription,
      channelCode
    }).pipe(
      first()
    ).subscribe(() => {
      if (isSubscription) {
        this.notificationRepository.subscribeChannel(channelCode);
      } else {
        this.notificationRepository.unsubscribeChannel(channelCode);
      }
    });
  }
}
