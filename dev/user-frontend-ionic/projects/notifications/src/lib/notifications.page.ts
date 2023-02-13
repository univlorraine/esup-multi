import { Component, Inject } from '@angular/core';
import { InfiniteScrollCustomEvent } from '@ionic/angular';
import { Observable } from 'rxjs';
import { catchError, finalize, first, map } from 'rxjs/operators';
import { NotificationsModuleConfig, NOTIFICATIONS_CONFIG } from './notifications.config';
import { Notification, notifications$, setChannels } from './notifications.repository';
import { NotificationsService } from './notifications.service';

@Component({
  selector: 'app-notifications',
  templateUrl: './notifications.page.html',
  styleUrls: ['./notifications.page.scss'],
})
export class NotificationsPage {

  public notifications$: Observable<Notification[]> = notifications$;
  public notificationsIsEmpty$: Observable<boolean>;
  public isLoading = false;
  public endOfNotifications: boolean;
  public loadMoreNotificationsError: boolean;

  constructor(
    private notificationsService: NotificationsService,
    @Inject(NOTIFICATIONS_CONFIG) private config: NotificationsModuleConfig
  ) {
    this.notificationsIsEmpty$ = this.notifications$.pipe(map(notifications => notifications.length === 0));
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
        finalize(() => this.isLoading = false))
      .subscribe();

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

    const offset = (await this.notifications$.pipe(first()).toPromise()).length - 1;

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
      finalize(()=> infiniteScrollEvent.target.complete())
      ).subscribe((loadedNotifications) => {
        this.loadMoreNotificationsError = false;
        if (loadedNotifications.length < this.config.numberOfNotificationsToLoadOnScroll) {
          this.endOfNotifications = true;
        }
      });
  }

}
