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

import { createStore, PropsFactory, Store, StoreConfig } from '@ngneat/elf';
import { persistState } from '@ngneat/elf-persist-state';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { authenticatedUsername$, getAuthenticatedUsername } from '../auth/authenticated-username.repository';
import { localForageStore } from './local-forage';


type PropsFactories = [PropsFactory<any, any>, ...PropsFactory<any, any>[]];

const storeMapByName: Map<string, Store> = new Map();
const storeInitializedMapByName: Map<string, Observable<boolean>> = new Map();
const storePropsFactoriesMapByName: Map<string, PropsFactories> = new Map();

const buildStoreNameWithUsername = (storeName: string, username: string) => `${storeName}:${username || 'anonymous'}`;

const createUserStoreWithPersistence = (
  rawStoreName: string,
  username: string,
  ...propsFactories: PropsFactories
): Store => {

  const storeNameWithUsername = buildStoreNameWithUsername(rawStoreName, username);

  const store = createStore(
    {name: storeNameWithUsername},
    ...propsFactories
  );

  storePropsFactoriesMapByName.set(rawStoreName, propsFactories);
  storeMapByName.set(storeNameWithUsername, store);

  storeInitializedMapByName.set(storeNameWithUsername, persistState(store, {
    key: storeNameWithUsername,
    storage: localForageStore,
  }).initialized$);

  return store;
};

export const isUserStoreInitialized$ = (rawStoreName: string): Observable<boolean> => {
  const storeNameWithUsername = buildStoreNameWithUsername(rawStoreName, getAuthenticatedUsername());
  return storeInitializedMapByName.get(storeNameWithUsername);
};

const getOrCreateUserStore = (rawStoreName: string, username: string): Store => {
  const storeNameWithUsername = buildStoreNameWithUsername(rawStoreName, username);
  if (!storeMapByName.has(storeNameWithUsername)) {
    createUserStoreWithPersistence(
      rawStoreName,
      username,
      ...storePropsFactoriesMapByName.get(rawStoreName)
    );
  }

  return storeMapByName.get(storeNameWithUsername);
};

const selectUserStore = (name: string): Observable<Store> =>
  authenticatedUsername$.pipe(
    map(username => getOrCreateUserStore(name, username)),
  );

const getUserStore = (name: string): Store => getOrCreateUserStore(name, getAuthenticatedUsername());

export const registerUserStore =
  (
    storeConfig: StoreConfig,
    ...propsFactories: PropsFactories
  ): [Observable<Store>, () => Store] => {

    const username = getAuthenticatedUsername();
    const storeNameWithUsername = buildStoreNameWithUsername(storeConfig.name, username);

    if (!storeMapByName.has(storeNameWithUsername)) {
      createUserStoreWithPersistence(
        storeConfig.name,
        username,
        ...propsFactories
      );
    }

    return [
      selectUserStore(storeConfig.name),
      () => getUserStore(storeConfig.name)
    ];
};
