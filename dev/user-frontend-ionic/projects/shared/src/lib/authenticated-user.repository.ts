import { createStore, select, withProps } from '@ngneat/elf';
import {
  localStorageStrategy, persistState
} from '@ngneat/elf-persist-state';

const STORE_NAME = 'auth';


export interface AuthProps {
  authenticatedUser: AuthenticatedUser;
}

export interface AuthenticatedUser {
  authToken: string;
  username: string;
  displayName: string;
  name: string;
  firstname: string;
  email: string
}

const authStore = createStore(
  { name: STORE_NAME },
  withProps<AuthProps>({ authenticatedUser: null })
);

export const persist = persistState(authStore, {
  key: STORE_NAME,
  storage: localStorageStrategy,
});

export const authenticatedUser$ = authStore.pipe(select((state) => state.authenticatedUser));

export function updateUser(authenticatedUser: AuthProps['authenticatedUser']) {
  authStore.update((state) => ({
    ...state,
    authenticatedUser,
  }));
}

export const userIsAuthenticated$ = authStore.pipe(select((state) => !!state.authenticatedUser));

