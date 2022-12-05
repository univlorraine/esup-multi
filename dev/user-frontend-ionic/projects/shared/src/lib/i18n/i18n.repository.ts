import { createStore, select, withProps } from '@ngneat/elf';
import {
  localStorageStrategy, persistState
} from '@ngneat/elf-persist-state';

const STORE_NAME = 'i18n';

export interface I18nProps {
  language: string;
  defaultLanguage: string;
}

const store = createStore(
  { name: STORE_NAME },
  withProps<I18nProps>({
    defaultLanguage: null,
    language: null,
  })
);

const persist = persistState(store, {
  key: STORE_NAME,
  storage: localStorageStrategy,
});

export const currentLanguage$ = store.pipe(select((state) => state.language || state.defaultLanguage));

export const updateLanguage = (language: I18nProps['language']) => {
  store.update((state) => ({
    ...state,
    language,
  }));
};

export const updateDefaultLanguage = (defaultLanguage: I18nProps['defaultLanguage']) => {
  store.update((state) => ({
    ...state,
    defaultLanguage,
  }));
};
