import { Inject, Injectable } from '@angular/core';
import { createStore, select, withProps } from '@ngneat/elf';
import { persistState } from '@ngneat/elf-persist-state';
import { currentLanguage$, localForageStore } from '@ul/shared';
import { combineLatest } from 'rxjs';
import { filter, map } from 'rxjs/operators';


interface ContactUsProps {
  pageContent: ContactUsPageContent | null;
}

export interface ContactUsPageContent {
  icon?: string;
  translations?: Translation[];
}

export interface TranslatedContactUsPageContent {
  title: string;
  content: string;
  icon?: string;
}

interface Translation {
  // eslint-disable-next-line @typescript-eslint/naming-convention
  languages_code: string;
  title: string;
  content: string;
}

const STORE_NAME = 'contact-us';

const store = createStore(
  { name: STORE_NAME },
  withProps<ContactUsProps>({ pageContent: null })
);

const persist = persistState(store, {
  key: STORE_NAME,
  storage: localForageStore,
});

@Injectable({ providedIn: 'root' })
export class ContactUsRepository {

  private pageContent$ = store.pipe(select((state) => state.pageContent));

  //eslint-disable-next-line @typescript-eslint/member-ordering
  public translatedPageContent$ = combineLatest([this.pageContent$, currentLanguage$]).pipe(
    filter(([pageContent]) => pageContent !== null),
    map(([pageContent, currentLanguage]) =>
      {
        const translation = pageContent.translations.find((t) => t.languages_code === currentLanguage) ||
        pageContent.translations.find((t) => t.languages_code === this.environment.defaultLanguage) ||
        pageContent.translations[0];

        return {
          title: translation.title,
          content: translation.content,
          icon: pageContent.icon
        };
      })
  );

  constructor(
    @Inject('environment')
    private environment: any,) {
  }

  public setPageContent = (pageContent: ContactUsPageContent) => {
    store.update((state) => ({
      ...state,
      pageContent,
    }));
  };

}
