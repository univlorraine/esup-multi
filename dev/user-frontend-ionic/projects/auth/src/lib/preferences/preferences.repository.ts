import { createStore, select, setProps, withProps } from '@ngneat/elf';
import {
    persistState,
    localStorageStrategy,
  } from '@ngneat/elf-persist-state';

const STORE_NAME = 'auth-preferences';

export interface AuthPreferences {
    saveCredentialsOnAuthentication: boolean;
}

const store = createStore(
    { name: STORE_NAME },
    withProps<AuthPreferences>({
      saveCredentialsOnAuthentication: false
    })
  );

export const persist = persistState(store, {
    key: STORE_NAME,
    storage: localStorageStrategy,
});

export const saveCredentialsOnAuthentication$ = store.pipe(select((state) => state.saveCredentialsOnAuthentication));

export const setSaveCredentialsOnAuthentication = (saveCredentialsOnAuthentication: boolean) => {
    store.update(setProps({
      saveCredentialsOnAuthentication
    }));
};