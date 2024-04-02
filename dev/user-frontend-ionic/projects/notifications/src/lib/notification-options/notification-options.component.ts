/*
 * Copyright ou © ou Copr. Université de Lorraine, (2022)
 *
 * Direction du Numérique de l'Université de Lorraine - SIED
 *  (dn-mobile-dev@univ-lorraine.fr)
 * JNESIS (contact@jnesis.com)
 *
 * Ce logiciel est un programme informatique servant à rendre accessible
 * sur mobile divers services universitaires aux étudiants et aux personnels
 * de l'université.
 *
 * Ce logiciel est régi par la licence CeCILL 2.1, soumise au droit français
 * et respectant les principes de diffusion des logiciels libres. Vous pouvez
 * utiliser, modifier et/ou redistribuer ce programme sous les conditions
 * de la licence CeCILL telle que diffusée par le CEA, le CNRS et INRIA
 * sur le site "http://cecill.info".
 *
 * En contrepartie de l'accessibilité au code source et des droits de copie,
 * de modification et de redistribution accordés par cette licence, il n'est
 * offert aux utilisateurs qu'une garantie limitée. Pour les mêmes raisons,
 * seule une responsabilité restreinte pèse sur l'auteur du programme, le
 * titulaire des droits patrimoniaux et les concédants successifs.
 *
 * À cet égard, l'attention de l'utilisateur est attirée sur les risques
 * associés au chargement, à l'utilisation, à la modification et/ou au
 * développement et à la reproduction du logiciel par l'utilisateur étant
 * donné sa spécificité de logiciel libre, qui peut le rendre complexe à
 * manipuler et qui le réserve donc à des développeurs et des professionnels
 * avertis possédant des connaissances informatiques approfondies. Les
 * utilisateurs sont donc invités à charger et à tester l'adéquation du
 * logiciel à leurs besoins dans des conditions permettant d'assurer la
 * sécurité de leurs systèmes et/ou de leurs données et, plus généralement,
 * à l'utiliser et à l'exploiter dans les mêmes conditions de sécurité.
 *
 * Le fait que vous puissiez accéder à cet en-tête signifie que vous avez
 * pris connaissance de la licence CeCILL 2.1, et que vous en avez accepté les
 * termes.
 */

import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Platform } from '@ionic/angular';
import { combineLatest, Observable } from 'rxjs';
import { map, take } from 'rxjs/operators';
import { Notification, NotificationsRepository, TranslatedChannel, NotificationsService } from '@multi/shared';
import { ToastService } from '../toast.service';

interface NotificationOptions {
  filterable: boolean;
  channel: TranslatedChannel;
  isSubscribed: boolean;
}

@Component({
  selector: 'app-notification-options',
  templateUrl: './notification-options.component.html',
  styleUrls: ['../../../../../src/theme/app-theme/styles/notifications/notification-options.component.scss'],
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
