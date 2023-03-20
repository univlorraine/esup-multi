import { createStore } from '@ngneat/elf';
import { selectAllEntities, setEntities, withEntities } from '@ngneat/elf-entities';
import { persistState } from '@ngneat/elf-persist-state';
import { localForageStore } from '@ul/shared';

export interface SocialNetwork {
  id: string;
  link: string;
  icon: string;
  title: string;
}

const STORE_NAME = 'socialNetwork';

const store = createStore(
    { name: STORE_NAME },
    withEntities<SocialNetwork>());

export const persist = persistState(store, {
  key: STORE_NAME,
  storage: localForageStore,
});

export const socialNetworks$ = store.pipe(selectAllEntities());

export const setSocialNetworks = (socialNetworks: SocialNetwork[]) => {
  store.update(setEntities(socialNetworks));
};

export const clearSocialNetworks = () => store.reset();
