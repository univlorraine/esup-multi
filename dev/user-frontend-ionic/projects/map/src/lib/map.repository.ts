import { createStore, select, withProps } from '@ngneat/elf';
import {
    localStorageStrategy, persistState
} from '@ngneat/elf-persist-state';

const STORE_NAME = 'markers';

export interface MarkersProps {
    markers: Marker[];
}
export interface Marker {
    title: string;
    description: string;
    category: string;
    latitude: number;
    longitude: number;
}

const markersStore = createStore(
    { name: STORE_NAME },
    withProps<MarkersProps>({ markers: []})
  );

export const persist = persistState(markersStore, {
    key: STORE_NAME,
    storage: localStorageStrategy,
});

export const markersList$ = markersStore.pipe(select((state) => state.markers));

export const setMarkers = (markers: MarkersProps['markers']) => {
    markersStore.update((state) => ({
      ...state,
      markers,
    }));
};
