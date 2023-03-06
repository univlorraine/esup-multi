import { Component, Inject } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { InfiniteScrollCustomEvent } from '@ionic/angular';
import { currentLanguage$ } from '@ul/shared';
import { combineLatest, Observable, Subscription } from 'rxjs';
import { catchError, filter, finalize, first, map, mergeMap, switchMap } from 'rxjs/operators';
import { NotificationsModuleConfig, NOTIFICATIONS_CONFIG } from './notifications.config';
import {
  Channel, channels$, Notification,
  notifications$, setChannels, setNotifications, TranslatedChannel
} from './notifications.repository';
import { NotificationsService } from './notifications.service';

@Component({
  selector: 'app-notifications',
  templateUrl: './notifications.page.html',
  styleUrls: ['./notifications.page.scss'],
})
export class NotificationsPage {

  public channels: Observable<Channel[]> = channels$;
  public translatedChannels$: Observable<TranslatedChannel[]>;
  public channelsSelected$: Observable<TranslatedChannel[]>;
  public filteredNotifications$: Observable<Notification[]>;
  public isLoading = false;
  public endOfNotifications: boolean;
  public loadMoreNotificationsError: boolean;
  form: FormGroup;
  private subscriptions: Subscription[] = [];

  constructor(
    private notificationsService: NotificationsService,
    @Inject(NOTIFICATIONS_CONFIG) private config: NotificationsModuleConfig,
    private formBuilder: FormBuilder
  ) {
    this.form = this.formBuilder.group({
      channelsForm: this.formBuilder.array([])
    });

    this.translatedChannels$ = combineLatest([channels$, currentLanguage$]).pipe(
      map(([channel, currentLanguage]) => this.notificationsService.mapToTranslatedChannels(channel, currentLanguage)),
    );

    this.subscriptions.push(this.translatedChannels$.subscribe(translatedChannels => {
      this.channelsForm.clear();
      translatedChannels.forEach(() => this.channelsForm.push(new FormControl(true)));
    }));

    this.channelsSelected$ = combineLatest([this.channelsForm.valueChanges, this.translatedChannels$]).pipe(
      filter(([checkboxes, channels]) => checkboxes.length === channels.length),
      map(([checkboxes, channels]) =>
        checkboxes
          .map((checked, index) => checked ? channels[index] : null)
          .filter((index) => index != null)
      )
    );

    this.filteredNotifications$ = combineLatest([notifications$, this.channelsSelected$]).pipe(
      map(([notifications, channelSelected]) => notifications.filter(
        notification => channelSelected.some(channel => channel.code === notification.channel)
      )));
  }

  get channelsForm() {
    return this.form.get('channelsForm') as FormArray;
  }

  async ionViewWillEnter() {
    this.endOfNotifications = false;
    this.loadMoreNotificationsError = false;

    this.notificationsService.getChannels().pipe(first()).subscribe(channels => {
      setChannels(channels);
    });

    this.isLoading = true;

    this.notificationsService.loadNotifications(0, this.config.numberOfNotificationsOnFirstLoad)
      .pipe(
        first(),
        mergeMap((notifications) => {
          const notificationIds = notifications
            .filter((notification) => notification.state === 'UNREAD')
            .map((notification) => notification.id);

          return this.notificationsService.markUnreadNotificationsAsRead(notificationIds);
        }),
        finalize(() => this.isLoading = false),
      ).subscribe();
  }

  ionViewDidLeave() {
    this.subscriptions.forEach(subscription => subscription.unsubscribe());
  }

  handleRefresh(event) {
    this.notificationsService.loadNotifications(0, this.config.numberOfNotificationsOnFirstLoad).pipe(
      first(),
      finalize(() => {
        event.target.complete();
        this.endOfNotifications = false;
      }
      )).subscribe();
  };

  async onIonInfinite(ev: Event) {
    const infiniteScrollEvent = ev as InfiniteScrollCustomEvent;

    const offset = (await this.filteredNotifications$.pipe(first()).toPromise()).length - 1;

    if (this.endOfNotifications) {
      infiniteScrollEvent.target.complete();
      return;
    }

    this.notificationsService.loadNotifications(offset, this.config.numberOfNotificationsToLoadOnScroll).pipe(
      first(),
      catchError((error) => {
        this.loadMoreNotificationsError = true;
        throw new Error(error);
      }),
      finalize(() => infiniteScrollEvent.target.complete())
    ).subscribe((loadedNotifications) => {
      this.loadMoreNotificationsError = false;
      if (loadedNotifications.length < this.config.numberOfNotificationsToLoadOnScroll) {
        this.endOfNotifications = true;
      }
    });
  }

  deleteNotification(id: string) {
    this.notificationsService.deleteNotification(id)
    .pipe(
      switchMap((res) => notifications$),
      first(),
    )
    .subscribe((notifications: Notification[]) => {
      setNotifications(notifications.filter(notification => notification.id !== id));
    });
  }

  async removeChannelFromFilter(channelCode: string) {
    this.translatedChannels$
      .pipe(first())
      .subscribe(channels => {
        const index = channels.findIndex(channel => channel.code === channelCode);
        const newValue = [...this.channelsForm.value];
        newValue[index] = false;
        this.channelsForm.setValue(newValue);
      });
  }
}
