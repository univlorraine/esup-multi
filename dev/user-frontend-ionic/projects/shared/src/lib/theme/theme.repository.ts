import { createStore, select, setProps, withProps } from '@ngneat/elf';
import {
  persistState
} from '@ngneat/elf-persist-state';
import { localForageStore } from '../store/local-forage';

const STORE_NAME = 'theme';

export interface ThemeProps {
    isDarkTheme: boolean;
    userHadSetThemeInApp: boolean;
}

const store = createStore(
    { name: STORE_NAME },
    withProps<ThemeProps>({
      isDarkTheme: false,
      userHadSetThemeInApp: false
    })
  );

export const persist = persistState(store, {
    key: STORE_NAME,
    storage: localForageStore,
});

export const themeRepoInitialized$ = persist.initialized$;

export const isDarkTheme$ = store.pipe(select((state) => state.isDarkTheme));

export const userHadSetThemeInApp$ = store.pipe(select((state) => state.userHadSetThemeInApp));


export const setIsDarkTheme = (isDarkThemeProps: ThemeProps['isDarkTheme']) => {
    store.update(setProps({
      isDarkTheme: isDarkThemeProps
    }));
};

export const setUserHaveSetThemeInApp = (userHadSetThemeInAppProps: ThemeProps['userHadSetThemeInApp']) => {
  store.update(setProps({
    userHadSetThemeInApp: userHadSetThemeInAppProps
  }));
};

export const isDarkTheme = () => store.getValue()?.isDarkTheme;

export const userHadSetThemeInApp = () => store.getValue()?.userHadSetThemeInApp;

