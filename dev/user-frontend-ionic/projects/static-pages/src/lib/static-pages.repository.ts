import { Inject, Injectable } from '@angular/core';
import { createStore } from '@ngneat/elf';
import { selectAllEntities, setEntities, withEntities } from '@ngneat/elf-entities';
import { persistState } from '@ngneat/elf-persist-state';
import { currentLanguage$, localForageStore } from '@ul/shared';
import { combineLatest, Observable } from 'rxjs';
import { map } from 'rxjs/operators';



export interface StaticPage {
  id: number;
  icon?: string;
  iconSourceSvgLightTheme?: string;
  iconSourceSvgDarkTheme?: string;
  translations?: Translation[];
  statisticName?: string;
}

export interface TranslatedStaticPage {
  id: number;
  title: string;
  content: string;
  icon?: string;
  iconSourceSvgLightTheme?: string;
  iconSourceSvgDarkTheme?: string;
  statisticName?: string;
}

interface Translation {
  // eslint-disable-next-line @typescript-eslint/naming-convention
  languages_code: string;
  title: string;
  content: string;
}

const STORE_NAME = 'static-pages';

const store = createStore(
  { name: STORE_NAME },
  withEntities<StaticPage>());

export const persistStaticPages = persistState(store, {
  key: STORE_NAME,
  storage: localForageStore,
});

@Injectable({ providedIn: 'root' })
export class StaticPagesRepository {

  public staticPages$ = store.pipe(selectAllEntities());

  public translatedStaticPages$ = combineLatest([this.staticPages$, currentLanguage$]).pipe(
    map(([staticPages, currentLanguage]) => staticPages.map(staticPage => {
      const translation = staticPage.translations.find((t) => t.languages_code === currentLanguage) ||
        staticPage.translations.find((t) => t.languages_code === this.environment.defaultLanguage) ||
        staticPage.translations[0];
      return {
        id: staticPage.id,
        title: translation.title,
        content: translation.content,
        icon: staticPage.icon,
        iconSourceSvgLightTheme: staticPage.iconSourceSvgLightTheme,
        iconSourceSvgDarkTheme: staticPage.iconSourceSvgDarkTheme,
        statisticName: staticPage.statisticName
      };
    }))
  );

  constructor(
    @Inject('environment')
    private environment: any,) {
  }

  public setStaticPages = (staticPages: StaticPage[]) => {
    store.update(setEntities(staticPages));
  };

  public getStaticPage(id): Observable<TranslatedStaticPage> {
    return this.translatedStaticPages$.pipe(
      map(pages => pages.find(page => page.id === id))
    );
  }
}
