import { Inject, Injectable } from '@angular/core';
import { createStore, select, withProps } from '@ngneat/elf';
import { persistState } from '@ngneat/elf-persist-state';
import { currentLanguage$, localForageStore } from '@ul/shared';
import { combineLatest } from 'rxjs';
import { filter, map } from 'rxjs/operators';


interface LoginProps {
  pageContent: LoginPageContent | null;
}

export interface LoginPageContent {
  translations?: Translation[];
}

export interface TranslatedLoginPageContent {
  /* eslint-disable @typescript-eslint/naming-convention */
  connexion_text: string;
  not_authentified_text: string;
  /* eslint-enable @typescript-eslint/naming-convention */
}

interface Translation {
  /* eslint-disable @typescript-eslint/naming-convention */
  languages_code: string;
  connexion_text: string;
  not_authentified_text: string;
  /* eslint-enable @typescript-eslint/naming-convention */
}

const STORE_NAME = 'login-page';

const store = createStore(
  { name: STORE_NAME },
  withProps<LoginProps>({ pageContent: null })
);

const persist = persistState(store, {
  key: STORE_NAME,
  storage: localForageStore,
});

@Injectable({ providedIn: 'root' })
export class LoginRepository {

  private pageContent$ = store.pipe(select((state) => state.pageContent));

  //eslint-disable-next-line @typescript-eslint/member-ordering
  public translatedPageContent$ = combineLatest([this.pageContent$, currentLanguage$]).pipe(
    filter(([pageContent]) => pageContent !== null),
    map(([pageContent, currentLanguage]) => {
      const translations = pageContent.translations;
      if (translations && translations.length > 0) {

        const translation = pageContent.translations.find((t) => t.languages_code === currentLanguage) ||
          pageContent.translations.find((t) => t.languages_code === this.environment.defaultLanguage) ||
          pageContent.translations[0];

        return {
          /* eslint-disable @typescript-eslint/naming-convention */
          connexion_text: translation.connexion_text,
          not_authentified_text: translation.not_authentified_text,
          /* eslint-enable @typescript-eslint/naming-convention */
        };
      } else {
        return null;
      }
    })
  );

  constructor(
    @Inject('environment')
    private environment: any,) {
  }

  public setPageContent = (pageContent: LoginPageContent) => {
    store.update((state) => ({
      ...state,
      pageContent,
    }));
  };

}
