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

import { Inject, Injectable } from '@angular/core';
import { createStore, select, withProps } from '@ngneat/elf';
import { addEntities, deleteEntities, selectAllEntities, setEntities, withEntities } from '@ngneat/elf-entities';
import { persistState } from '@ngneat/elf-persist-state';
import { currentLanguage$ } from '../i18n/i18n.repository';
import { localForageStore } from '../store/local-forage';
import { combineLatest, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

const NOTIFICATIONS_STORE = 'notifications';
const CHANNELS_STORE= 'channels';

const defaultNotificationColor = 'black';
const defaultNotificationIcon = 'information-circle';
export interface ChannelsProps {
  unsubscribedChannels: string[];
}

export interface Notification {
  id: string;
  author: string;
  topic: string;
  channel: string;
  channelLabel: string;
  icon: string;
  title: string;
  message: string;
  url: string;
  state: string;
  creationDate: string;
  color: string;
  routerLink?: string;
}

export interface Channel {
  id: number;
  code: string;
  color?: string;
  translations?: Translation[];
  icon?: string;
  routerLink?: string;
  filterable: boolean;
}

interface Translation {
  // eslint-disable-next-line @typescript-eslint/naming-convention
  languages_code: string;
  label: string;
}
export interface TranslatedChannel {
  code: string;
  label: string;
  filterable: boolean;
}

const notificationsStore = createStore(
  { name: NOTIFICATIONS_STORE },
  withEntities<Notification>(),
);

const channelsStore = createStore(
  { name: CHANNELS_STORE },
  withProps<ChannelsProps>({
    unsubscribedChannels: [],
  }),
  withEntities<Channel>()
);

@Injectable({ providedIn: 'root' })
export class NotificationsRepository {

  public channels$ = channelsStore.pipe(selectAllEntities());
  public unsubscribedChannels$ = channelsStore.pipe(select((state) => state.unsubscribedChannels));

  public notifications$: Observable<Notification[]> = combineLatest([
    notificationsStore.pipe(selectAllEntities()),
    this.channels$
  ]).pipe(
    map(([notifications, channels]) => {

      if (notifications.length === 0 || channels.length === 0) {
        return []; // Retourner un tableau vide si l'une des valeurs est vide
      }

      return notifications.map(notification => {
        const matchedChannel = channels?.find(channel => notification.channel === channel.code);
        notification.color = matchedChannel?.color ? matchedChannel.color : defaultNotificationColor;
        notification.icon = matchedChannel?.icon ? matchedChannel.icon : defaultNotificationIcon;
        notification.routerLink = matchedChannel?.routerLink ? matchedChannel.routerLink : null;
        return notification;
      });})
  );

  public translatedChannels$ = combineLatest([this.channels$, currentLanguage$]).pipe(
    map(([channels, currentLanguage]) => channels.map(channel => {
        const translation = channel.translations.find((t) => t.languages_code === currentLanguage) ||
          channel.translations.find((t) => t.languages_code === this.environment.defaultLanguage) ||
          channel.translations[0];
        return { label: translation.label, code: channel.code, filterable: channel.filterable };
      }))
  );

  private persistNotificationsStore = persistState(notificationsStore, {
    key: NOTIFICATIONS_STORE,
    storage: localForageStore,
  });

  private persistChannelsStore = persistState(channelsStore, {
    key: CHANNELS_STORE,
    storage: localForageStore,
  });

  constructor(
    @Inject('environment')
    private environment: any,
  ) {}

  public setNotifications(notifications: Notification[]) {
    notificationsStore.update(setEntities(notifications));
  }

  public addNotifications(notifications: Notification[]) {
    notificationsStore.update(addEntities(notifications));
  }

  public deletNotification(id: string){
    notificationsStore.update(deleteEntities(id));
  }

  public clearNotifications() {
    notificationsStore.reset();
  }

  public setChannels(channels: Channel[]) {
    channelsStore.update(setEntities(channels));
  }

  public setUnsubscribedChannels(userUnsubscribedChannels: string[]) {
    channelsStore.update((state) => ({
      ...state,
      unsubscribedChannels: userUnsubscribedChannels,
    }));
  }

  public subscribeChannel(channelCode: string) {
    channelsStore.update((state) => ({
          ...state,
          unsubscribedChannels: state.unsubscribedChannels.filter((code) => code !== channelCode)
        }));
  }

  public unsubscribeChannel(channelCode: string) {
    channelsStore.update(state => {
      // On crée un nouveau set contenant les canaux actuels auxquels l'utilisateur est désabonné
      const unsubscribedChannelsSet = new Set(state.unsubscribedChannels);
      // On ajoute le canal demandé à la liste
      unsubscribedChannelsSet.add(channelCode);
      // On retourne une nouvelle copie de l'ensemble en le convertissant en tableau grâce à l'opérateur
      // de spread qui permet également de retirer les doublons au passage
      return {
        ...state,
        unsubscribedChannels: [...unsubscribedChannelsSet],
      };
    });
  }
}
