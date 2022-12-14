import { createStore, select, withProps } from '@ngneat/elf';
import {
  persistState
} from '@ngneat/elf-persist-state';
import { localForageStore } from '../store/local-forage';

const STORE_NAME = 'auth';


export interface AuthProps {
  authenticatedUser: AuthenticatedUser;
}

export interface AuthenticatedUser {
  authToken: string;
  displayName: string;
  name: string;
  firstname: string;
  email: string;
  roles: string[];
}

const authStore = createStore(
  { name: STORE_NAME },
  withProps<AuthProps>({ authenticatedUser: null })
);

export const persist = persistState(authStore, {
  key: STORE_NAME,
  storage: localForageStore,
});

export const authenticatedUser$ = authStore.pipe(select((state) => state.authenticatedUser));

export const updateUser = (authenticatedUser: AuthProps['authenticatedUser']) => {
  authStore.update((state) => ({
    ...state,
    authenticatedUser,
  }));
};

export const userIsAuthenticated$ = authStore.pipe(select((state) => !!state.authenticatedUser));

export const clearAuthenticatedUser = () => authStore.reset();

