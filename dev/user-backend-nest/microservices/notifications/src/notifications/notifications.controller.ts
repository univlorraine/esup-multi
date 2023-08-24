import { CacheInterceptor, CacheKey } from '@nestjs/cache-manager';
import { Controller, UseInterceptors } from '@nestjs/common';
import { MessagePattern } from '@nestjs/microservices';
import { Observable } from 'rxjs';
import {
  ChannelSubscriberQueryDto,
  DirectusChannelResultDto,
  NotificationDeleteQueryDto,
  NotificationResultDto,
  NotificationsMarkAsReadQueryDto,
  NotificationsQueryDto,
  RegisterFCMTokenQueryDto,
  UnregisterFCMTokenQueryDto,
  UnsubscribedChannelsQueryDto,
} from './notifications.dto';
import { NotificationsService } from './notifications.service';

@Controller()
export class NotificationsController {
  constructor(private readonly notificationsService: NotificationsService) {}

  @MessagePattern({ cmd: 'notifications' })
  getNotifications(
    data: NotificationsQueryDto,
  ): Observable<NotificationResultDto[]> {
    return this.notificationsService.getNotifications(data);
  }

  @MessagePattern({ cmd: 'notificationsDelete' })
  deleteNotification(data: NotificationDeleteQueryDto) {
    return this.notificationsService.deleteNotification(data);
  }

  @MessagePattern({ cmd: 'notificationsRead' })
  markNotificationsAsRead(
    data: NotificationsMarkAsReadQueryDto,
  ): Observable<void> {
    return this.notificationsService.markNotificationsAsRead(data);
  }

  @MessagePattern({ cmd: 'channels' })
  @CacheKey('notifications_channels')
  @UseInterceptors(CacheInterceptor)
  getChannels(): Observable<DirectusChannelResultDto[]> {
    return this.notificationsService.getChannels();
  }

  @MessagePattern({ cmd: 'unsubscribedChannels' })
  getUnsubscribedChannels(
    data: UnsubscribedChannelsQueryDto,
  ): Observable<string[]> {
    return this.notificationsService.getUnsubscribedChannels(data);
  }

  @MessagePattern({ cmd: 'channelsAllowOrDisallow' })
  subscribeOrUnsubscribeUserToChannels(
    data: ChannelSubscriberQueryDto,
  ): Observable<number> {
    return this.notificationsService.subscribeOrUnsubscribeUserToChannels(data);
  }

  @MessagePattern({ cmd: 'registerFCMToken' })
  registerFCMToken(data: RegisterFCMTokenQueryDto) {
    return this.notificationsService.saveFCMToken(data);
  }

  @MessagePattern({ cmd: 'unregisterFCMToken' })
  unregisterFCMToken(data: UnregisterFCMTokenQueryDto) {
    return this.notificationsService.unregisterFCMToken(data);
  }
}
