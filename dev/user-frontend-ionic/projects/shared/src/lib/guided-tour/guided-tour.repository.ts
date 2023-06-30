import { createStore, setProps, withProps } from '@ngneat/elf';
import { persistState } from '@ngneat/elf-persist-state';
import { localForageStore } from '../store/local-forage';


const STORE_NAME = 'guided-tour';

export interface GuidedTourProps {
  anonymousTourViewed: boolean;
  loggedTourViewed: boolean;
  scheduleTourViewed: boolean;
}

const store = createStore(
  { name: STORE_NAME },
  withProps<GuidedTourProps>({
    anonymousTourViewed: false,
    loggedTourViewed: false,
    scheduleTourViewed: false
  })
);

const persist = persistState(store, {
  key: STORE_NAME,
  storage: localForageStore,
});

export const isAnonymousTourViewed = () => store.getValue()?.anonymousTourViewed;
export const isLoggedTourViewed = () => store.getValue()?.loggedTourViewed;
export const isScheduleTourViewed = () => store.getValue()?.scheduleTourViewed;

export const setAnonymousTourViewed = () => {
  store.update(setProps({
    anonymousTourViewed: true
  }));
};

export const setLoggedTourViewed = () => {
  store.update(setProps({
    loggedTourViewed: true
  }));
};

export const setScheduleTourViewed = () => {
  store.update(setProps({
    scheduleTourViewed: true
  }));
};
