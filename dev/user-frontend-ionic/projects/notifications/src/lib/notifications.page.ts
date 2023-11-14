import { Component, Inject, OnDestroy, ViewChild } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { InfiniteScrollCustomEvent, IonContent, IonModal, Platform } from '@ionic/angular';
import { NetworkService, PageLayoutService } from '@ul/shared';
import { combineLatest, Observable, Subscription } from 'rxjs';
import { catchError, filter, finalize, map, mergeMap, startWith, take } from 'rxjs/operators';
import { NotificationsModuleConfig, NOTIFICATIONS_CONFIG } from './notifications.config';
import {
  Channel,
  Notification, NotificationsRepository, TranslatedChannel, NotificationsService
} from '@ul/shared';

import { ToastService } from './toast.service';
import { Browser } from "@capacitor/browser";

const defaultBreakpoint = 0.50;

@Component({
  selector: 'app-notifications',
  templateUrl: './notifications.page.html',
  styleUrls: ['./notifications.page.scss'],
})
export class NotificationsPage implements OnDestroy {

  @ViewChild('popover') popover;
  @ViewChild('modal') modal: IonModal;
  @ViewChild(IonContent, { static: false }) private content: IonContent;

  public isOpen = false;
  public channels$: Observable<Channel[]>;
  public translatedChannels$: Observable<TranslatedChannel[]>;
  public filterableChannels$: Observable<TranslatedChannel[]>;
  public channelsSelected$: Observable<TranslatedChannel[]>;
  public hasNoChannelsSelected$: Observable<boolean>;
  public filteredNotifications$: Observable<Notification[]>;
  public endOfNotifications: boolean;
  public isLoading = false;
  public loadMoreNotificationsError: boolean;
  public isNotificationOptionsOpen = false;
  form: FormGroup;
  public hasScrollbar = false;
  public selectedNotificationOption: Notification;
  private nonFilterableChannels$: Observable<TranslatedChannel[]>;
  private enabledChannels$: Observable<TranslatedChannel[]>;
  private subscriptions: Subscription[] = [];

  constructor(
    private notificationsService: NotificationsService,
    @Inject(NOTIFICATIONS_CONFIG) private config: NotificationsModuleConfig,
    private formBuilder: FormBuilder,
    public pageLayoutService: PageLayoutService,
    public platform: Platform,
    public notificationRepository: NotificationsRepository,
    private toastService: ToastService,
    private networkService: NetworkService,

  ) {
    this.translatedChannels$ = this.notificationRepository.translatedChannels$;
    this.channels$ = this.notificationRepository.channels$;

    this.form = this.formBuilder.group({
      channelsForm: this.formBuilder.array([])
    });

    this.filterableChannels$ = this.translatedChannels$.pipe(
      map((channels) => channels.filter((channel) => channel.filterable === true))
    );

    this.nonFilterableChannels$ = this.translatedChannels$.pipe(
      map((channels) => channels.filter((channel) => channel.filterable === false))
    );

    this.subscriptions.push(this.filterableChannels$.subscribe(filterableChannels => {
      this.channelsForm.clear();
      filterableChannels.forEach(() => this.channelsForm.push(new FormControl(false)));
    }));

    this.channelsSelected$ = combineLatest([this.channelsForm.valueChanges, this.filterableChannels$]).pipe(
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

    this.enabledChannels$ = combineLatest([this.channelsSelected$, this.nonFilterableChannels$]).pipe(
      map(([channelsSelected, nonFilterableChannels]) => [...channelsSelected, ...nonFilterableChannels])
    );

    this.filteredNotifications$ = combineLatest([
      this.notificationRepository.notifications$,
      this.enabledChannels$.pipe(startWith([]))])
      .pipe(
        map(([notifications, enabledChannels]) => {
          if (notifications.length > 0 && this.content) {
            this.checkForScrollbar();
          }
          if (enabledChannels.every(channel => !channel.filterable)) {
            return notifications;
          }
          return notifications.filter(notification => enabledChannels.some(channel => channel.code === notification.channel));
        }),
      );

  }

  get channelsForm() {
    return this.form.get('channelsForm') as FormArray;
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(subscription => {
      subscription.unsubscribe();
    });
  }

  async ionViewWillEnter() {
    this.endOfNotifications = false;
    this.loadMoreNotificationsError = false;

    this.loadDataIfNetworkAvailable();

    this.subscriptions.push(this.platform.resize.subscribe(async () => {
      this.updateBreakpoints();
    }));
  }

  async checkForScrollbar() {
    const scrollElement = await this.content.getScrollElement();
    this.hasScrollbar = scrollElement.scrollHeight > scrollElement.clientHeight;
  }

  async handleRefresh(event) {
    this.notificationsService.loadNotifications(0, this.config.numberOfNotificationsOnFirstLoad).pipe(
      take(1),
      finalize(() => {
        event.target.complete();
        this.endOfNotifications = false;
      }
      )).subscribe();
  };

  async onIonInfinite(ev: Event) {
    const infiniteScrollEvent = ev as InfiniteScrollCustomEvent;

    const offset = (await this.filteredNotifications$.pipe(take(1)).toPromise()).length - 1;

    if (!ev.isTrusted) {
      infiniteScrollEvent.target.complete();
    }
    if (this.endOfNotifications) {
      return;
    }

    this.notificationsService.loadNotifications(offset, this.config.numberOfNotificationsToLoadOnScroll).pipe(
      take(1),
      catchError((error) => {
        this.loadMoreNotificationsError = true;
        throw new Error(error);
      }),
      finalize(() => infiniteScrollEvent.target ?? infiniteScrollEvent.target.complete())
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
        take(1),
      ).subscribe(async (status) => {
        this.notificationRepository.deletNotification(id);
        this.toastService.displayToast('NOTIFICATIONS.ALERT.DELETED');
        this.dismissModal();
      });
  }

  async removeChannelFromFilter(channelCode: string) {
    this.filterableChannels$
      .pipe(take(1))
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
      take(1),
      map(notifications => notifications.find(notification => notification.id === notificationId))
    ).toPromise();

    this.isNotificationOptionsOpen = true;
    await this.modal.present();
    this.updateBreakpoints();
  }

  presentPopover(e: Event) {
    this.popover.event = e;
    this.isOpen = true;
  }

  private async loadDataIfNetworkAvailable() {
    if (!(await this.networkService.getConnectionStatus()).connected) {
      return;
    }

    this.isLoading = true;

    this.notificationsService.loadAndStoreChannels().pipe(take(1)).subscribe();
    this.notificationsService.loadAndStoreUnsubscribedChannels().pipe(take(1)).subscribe();

    this.notificationsService.loadNotifications(0, this.config.numberOfNotificationsOnFirstLoad)
      .pipe(
        take(1),
        mergeMap((notifications) => {
          const notificationIds = notifications
            .filter((notification) => notification.state === 'UNREAD')
            .map((notification) => notification.id);

          return this.notificationsService.markUnreadNotificationsAsRead(notificationIds);
        }),
        finalize(() => this.isLoading = false),
      ).subscribe();
  }

  private updateBreakpoints() {
    const isLandscape = this.platform.isLandscape();
    const isDesktop = this.platform.is('desktop');

    const breakpoint = (isDesktop || !isLandscape) ? defaultBreakpoint : 1;

    this.modal.initialBreakpoint = breakpoint;
    this.modal.setCurrentBreakpoint(breakpoint);
  }

  public onClickLink(notification: Notification) {
    if (!notification.url) {
      return;
    }
    return Browser.open({ url: notification.url });
  }
}


