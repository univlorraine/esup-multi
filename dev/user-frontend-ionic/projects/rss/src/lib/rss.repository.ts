import { createStore, select, withProps } from '@ngneat/elf';
import {
  localStorageStrategy, persistState
} from '@ngneat/elf-persist-state';

const STORE_NAME = 'rssFeed';

export interface RssFeedProps {
  rssFeed: FeedItem[];
}

interface enclosure {
  url: string;
  type: string;
  length: number;
}

export interface FeedItem {
  title: string;
  enclosure: enclosure;
  content: string;
  link: string;
  pubDate: string;
}

const rssFeedStore = createStore(
    { name: STORE_NAME },
    withProps<RssFeedProps>({ rssFeed: []})
  );

export const persist = persistState(rssFeedStore, {
    key: STORE_NAME,
    storage: localStorageStrategy,
});

export const rssFeed$ = rssFeedStore.pipe(select((state) => state.rssFeed));

export const setRssFeed = (rssFeed: RssFeedProps['rssFeed']) => {
  rssFeedStore.update((state) => ({
    ...state,
    rssFeed,
  }));
};
