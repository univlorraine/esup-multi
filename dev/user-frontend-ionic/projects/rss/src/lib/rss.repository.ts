import { createStore, select, withProps } from '@ngneat/elf';
import {
  localStorageStrategy, persistState
} from '@ngneat/elf-persist-state';

const STORE_NAME = 'rssFeed';

export interface RssFeedProps {
  rssFeed: FeedItem[];
}

export interface FeedItem {
  title: string;
  description: string;
  link: string;
  published: Date;
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
