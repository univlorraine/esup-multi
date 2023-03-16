import { Component, Inject, ViewChild } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { InfiniteScrollCustomEvent, IonModal, Platform } from '@ionic/angular';
import { combineLatest, Observable, Subscription } from 'rxjs';
import { catchError, filter, finalize, first, map, mergeMap, startWith } from 'rxjs/operators';
import { NotificationsModuleConfig, NOTIFICATIONS_CONFIG } from './notifications.config';
import { Channel, Notification, NotificationsRepository, TranslatedChannel } from './notifications.repository';
import { NotificationsService } from './notifications.service';

const defaultBreakpoint = 0.50;

@Component({
  selector: 'app-notifications',
  templateUrl: './notifications.page.html',
  styleUrls: ['./notifications.page.scss'],
})
export class NotificationsPage {

  @ViewChild('modal') modal: IonModal;

  public channels$: Observable<Channel[]>;
  public translatedChannels$: Observable<TranslatedChannel[]>;
  public channelsSelected$: Observable<TranslatedChannel[]>;
  public hasNoChannelsSelected$: Observable<boolean>;
  public filteredNotifications$: Observable<Notification[]>;
  public isLoading = false;
  public endOfNotifications: boolean;
  public loadMoreNotificationsError: boolean;
  public isNotificationOptionsOpen = false;
  form: FormGroup;
  public selectedNotificationOption: Notification;
  private subscriptions: Subscription[] = [];

  constructor(
    private notificationsService: NotificationsService,
    @Inject(NOTIFICATIONS_CONFIG) private config: NotificationsModuleConfig,
    private formBuilder: FormBuilder,
    public platform: Platform,
    public notificationRepository: NotificationsRepository
  ) {
    this.translatedChannels$ = this.notificationRepository.translatedChannels$;
    this.channels$ = this.notificationRepository.channels$;

    this.form = this.formBuilder.group({
      channelsForm: this.formBuilder.array([])
    });

    this.subscriptions.push(this.translatedChannels$.subscribe(translatedChannels => {
      this.channelsForm.clear();
      translatedChannels.forEach(() => this.channelsForm.push(new FormControl(false)));
    }));

    this.channelsSelected$ = combineLatest([this.channelsForm.valueChanges, this.translatedChannels$]).pipe(
      filter(([checkboxes, channels]) => checkboxes.length === channels.length),
      map(([checkboxes, channels]) =>
        checkboxes
          .map((checked, index) => checked ? channels[index] : null)
          .filter((index) => index != null)
      )
    );

    this.hasNoChannelsSelected$ = this.channelsSelected$.pipe(
      map((channels) => channels.length === 0)
    );

    this.filteredNotifications$ = combineLatest([
      this.notificationRepository.notifications$,
      this.channelsSelected$.pipe(startWith([])),
      this.notificationRepository.channels$])
      .pipe(
        map(([notifications, channelSelected, channels]) => {
          if (channelSelected.length === 0) {
            return notifications;
          }
          return notifications.filter(notification => channelSelected.some(channel => channel.code === notification.channel) ||
            channels.some(channel => channel.code === notification.channel && channel.filterable === false)
          );
        }),
      );

    this.subscriptions.push(this.notificationsService.loadAndStoreUnsubscribedChannels().pipe(first()).subscribe());
  }

  get channelsForm() {
    return this.form.get('channelsForm') as FormArray;
  }

  async ionViewWillEnter() {
    this.endOfNotifications = false;
    this.loadMoreNotificationsError = false;

    this.notificationsService.loadAndStoreChannels().pipe(first()).subscribe();

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

    this.subscriptions.push(this.platform.resize.subscribe(async () => {
      this.updateBreakpoints();
    }));
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
        first(),
      ).subscribe(() => {
        this.notificationRepository.deletNotification(id);
        this.dismissModal();
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

  dismissModal() {
    this.isNotificationOptionsOpen = false;
  }

  async openModal(notificationId: string) {
    this.selectedNotificationOption = await this.filteredNotifications$.pipe(
      first(),
      map(notifications => notifications.find(notification => notification.id === notificationId))
    ).toPromise();

    this.isNotificationOptionsOpen = true;
    await this.modal.present();
    this.updateBreakpoints();
  }

  private updateBreakpoints() {
    const isLandscape = this.platform.isLandscape();
    const isDesktop = this.platform.is('desktop');

    const breakpoint = (isDesktop || !isLandscape) ? defaultBreakpoint : 1;

    this.modal.initialBreakpoint = breakpoint;
    this.modal.setCurrentBreakpoint(breakpoint);
  }
}
