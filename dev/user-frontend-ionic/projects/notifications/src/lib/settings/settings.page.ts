import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { combineLatest, Observable } from 'rxjs';
import { catchError, filter, finalize, map, take } from 'rxjs/operators';
import { NotificationsRepository, TranslatedChannel } from '../notifications.repository';
import { NotificationsService } from '../notifications.service';
import { ToastService } from '../toast.service';

interface ChannelSubscription extends TranslatedChannel {
  subscribed: boolean;
}

@Component({
  selector: 'app-settings',
  templateUrl: './settings.page.html',
  styleUrls: ['./settings.page.scss'],
})
export class SettingsPage implements OnInit {
  channelsSubscriptions$: Observable<ChannelSubscription[]>;
  channelForm: FormGroup;
  channelControls: string[] = [];

  constructor(
    private notificationsService: NotificationsService,
    public notificationRepository: NotificationsRepository,
    private toastService: ToastService,
  ) {}

  ngOnInit() {
    // Récupération des canaux qui peuvent être filtrés par l'utilisateur auprès de Directus
    const filterableChannels$ = this.notificationRepository.translatedChannels$.pipe(
      filter(filterableChannel => filterableChannel.length > 0),
      map(channels => channels.filter(channel => channel.filterable === true))
    );

    // On combine la liste des canaux reçue ci-dessus avec la liste des canaux auxquels l'utilisateur a déjà choisi
    // de se désabonner, renvoyée par l'API des notifications
    this.channelsSubscriptions$ = combineLatest([
      filterableChannels$,
      this.notificationRepository.unsubscribedChannels$
    ]).pipe(
      map(([channels, unsubscribedChannelsCodes]) => channels.map(channel => ({
        ...channel,
        subscribed: !unsubscribedChannelsCodes.includes(channel.code)
      })))
    );

    // On initialise le formulaire
    this.channelForm = new FormGroup({});

    this.channelsSubscriptions$.subscribe((channelSubscriptions: ChannelSubscription[]) => {
      channelSubscriptions.forEach((channelSubscription: ChannelSubscription) => {
        let control;

        // Si le contrôle n'a pas encore été créé pour le channel on le crée
        // On teste ici l'existence des contrôles car on repasse plusieurs fois dans ce subscribe
        // avec des valeurs différentes du fait du combineLatest ci-dessus
        if (!this.channelForm.contains(channelSubscription.code)) {
          control =  new FormControl(channelSubscription.subscribed);
          this.channelForm.addControl(`${channelSubscription.code}`, control);
          // On ajoute une souscription au changement de valeur sur ce contrôle
          control.valueChanges.subscribe(() => this.toggleSubscription(channelSubscription));
        } else {
          // Sinon on met à jour la valeur de ce contrôle avec la nouvelle valeur retournée par l'observable
          control = this.channelForm.get(`${channelSubscription.code}`);
          control.setValue(channelSubscription.subscribed, { emitEvent: false });
        }
      });
    });
  }

  toggleSubscription(channelSubscription: ChannelSubscription) {
    const control = this.channelForm.get(channelSubscription.code);
    const controlValue = control.value;

    // On détermine dans le formulaire la liste des codes des channels à envoyer pour désabonnement
    const unsubChannels = Object.keys(this.channelForm.controls)
      .filter(controlName => !this.channelForm.controls[controlName].value);

    // On désabonne l'utilisateur des channels trouvés
    this.notificationsService.subscribeOrUnsubscribeUserToChannels({
      channelCodes: unsubChannels,
    }).pipe(
      take(1),
      catchError(err => {
        // Si une erreur a lieu, on replace le toggle à sa position initiale
        control.setValue(!controlValue, { emitEvent: false });
        throw err;
      }),
      finalize(() => {
        // Si le désabonnement a réussi on met à jour le state avec les nouvelles valeurs
        this.notificationRepository.setUnsubscribedChannels(unsubChannels);
      })
    ).subscribe(() => {
        const toastMessage = controlValue ? 'NOTIFICATIONS.ALERT.CHANNEL.SUBSCRIBED' : 'NOTIFICATIONS.ALERT.CHANNEL.UNSUBSCRIBED';
        this.toastService.displayToast(toastMessage, channelSubscription.label);
    });
  }
}
