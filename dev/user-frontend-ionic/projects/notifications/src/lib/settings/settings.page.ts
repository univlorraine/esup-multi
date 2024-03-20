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

import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { combineLatest, Observable } from 'rxjs';
import { catchError, filter, finalize, take, map, tap } from 'rxjs/operators';
import { NotificationsRepository, NotificationsService, TranslatedChannel } from '@ul/shared';
import { ToastService } from '../toast.service';

interface ChannelSubscription extends TranslatedChannel {
  subscribed: boolean;
}

@Component({
  selector: 'app-settings',
  templateUrl: './settings.page.html',
  styleUrls: ['../../../../../src/theme/app-theme/notifications/settings.page.scss'],
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
