import { Component } from '@angular/core';
import { combineLatest, Observable } from 'rxjs';
import { first, map } from 'rxjs/operators';
import { NotificationsRepository } from '../notifications.repository';
import { NotificationsService } from '../notifications.service';
import { ChannelSubscription } from './channel-subscription/channel-subscription.component';



@Component({
  selector: 'app-seetings',
  templateUrl: './settings.page.html',
  styleUrls: ['./settings.page.scss'],
})
export class SettingsPage {
  channelsSubscriptions$: Observable<ChannelSubscription[]>;

  constructor(
    private notificationsService: NotificationsService,
    public notificationRepository: NotificationsRepository,
  ) {
    const filterableChannels$ = this.notificationRepository.translatedChannels$.pipe(
      map(channels => channels.filter(channel => channel.filterable === true))
    );

    this.channelsSubscriptions$ = combineLatest([
      filterableChannels$,
      this.notificationRepository.unsubscribedChannels$
    ]).pipe(
      map(([channels, unsubscribedChannelsCodes]) => channels.map(channel => ({
        ...channel,
        subscribed: !unsubscribedChannelsCodes.includes(channel.code)
      })))
    );
  }

  ionViewWillEnter() {
    this.notificationsService.loadAndStoreChannels().pipe(first()).subscribe();
    this.notificationsService.loadAndStoreUnsubscribedChannels().pipe(first()).subscribe();
  }
}
