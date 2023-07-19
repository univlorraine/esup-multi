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
