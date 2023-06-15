import { createStore, select, withProps } from '@ngneat/elf';
import {
  persistState,
  localStorageStrategy
} from '@ngneat/elf-persist-state';

const STORE_NAME = 'auth-username';


interface AuthProps {
  username: string;
}


const authStore = createStore(
  { name: STORE_NAME },
  withProps<AuthProps>({ username: null })
);

const persist = persistState(authStore, {
  key: STORE_NAME,
  storage: localStorageStrategy,
});

export const authenticatedUsername$ = authStore.pipe(select((state) => state.username));

export const getAuthenticatedUsername = () => authStore.getValue()?.username;

export const updateAuthenticatedUsername = (username: AuthProps['username']) => {
  authStore.update((state) => ({
    ...state,
    username,
  }));
};
export const clearAuthenticatedUsername = () => authStore.reset();

