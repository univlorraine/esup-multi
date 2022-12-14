import { createStore, select, withProps } from '@ngneat/elf';
import {
  persistState
} from '@ngneat/elf-persist-state';
import { localForageStore } from '@ul/shared';

const STORE_NAME = 'rssFeed';

export interface RssFeedProps {
  rssFeed: FeedItem[];
}

interface Enclosure {
  url: string;
  type: string;
  length: number;
}

export interface FeedItem {
  title: string;
  enclosure: Enclosure;
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
    storage: localForageStore,
});

export const rssFeed$ = rssFeedStore.pipe(select((state) => state.rssFeed));

export const setRssFeed = (rssFeed: RssFeedProps['rssFeed']) => {
  rssFeedStore.update((state) => ({
    ...state,
    rssFeed,
  }));
};
