import { Controller } from '@nestjs/common';
import { MessagePattern } from '@nestjs/microservices';
import { Observable } from 'rxjs';
import {
  DirectusChannel,
  NotificationDeleteQueryDto,
  NotificationDto,
  NotificationsQueryDto,
} from './notifications.dto';
import { NotificationsService } from './notifications.service';

@Controller()
export class NotificationsController {
  constructor(private readonly notificationsService: NotificationsService) {}

  @MessagePattern({ cmd: 'notifications' })
  getNotifications(data: NotificationsQueryDto): Observable<NotificationDto[]> {
    return this.notificationsService.getNotifications(data);
  }

  @MessagePattern({ cmd: 'notifications/channels' })
  getChannels(): Observable<DirectusChannel[]> {
    return this.notificationsService.getChannels();
  }

  @MessagePattern({ cmd: 'notificationsDelete' })
  deleteNotification(data: NotificationDeleteQueryDto) {
    return this.notificationsService.deleteNotification(data);
  }
}
