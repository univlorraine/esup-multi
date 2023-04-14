import { createStore } from '@ngneat/elf';
import { selectAllEntities, setEntities, withEntities } from '@ngneat/elf-entities';
import {
  persistState
} from '@ngneat/elf-persist-state';
import { Authorization, localForageStore } from '@ul/shared';

const STORE_NAME = 'important-news';

export interface ImportantNews {
  id: string;
  status: string;
  image?: string;
  color?: string;
  link?: string;
  authorization?: Authorization;
  translations?: Translation[];
};

interface Translation {
  // eslint-disable-next-line @typescript-eslint/naming-convention
  languages_code: string;
  title: string;
  content: string;
  buttonLabel: string;

}

export interface TranslatedImportantNews {
  id: string;
  status: string;
  image?: string;
  title: string;
  link?: string;
  color?: string;
  content: string;
  buttonLabel?: string;
  authorization?: Authorization;
}

export const store = createStore(
  { name: STORE_NAME },
  withEntities<ImportantNews>()
);

export const persist = persistState(store, {
  key: STORE_NAME,
  storage: localForageStore,
});

export const importantNewsList$ = store.pipe(selectAllEntities());

export const setImportantNews = (importantNews: ImportantNews[]) => {
  store.update(setEntities(importantNews));
};

