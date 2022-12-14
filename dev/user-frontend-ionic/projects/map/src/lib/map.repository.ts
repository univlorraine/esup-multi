import { createStore, select, withProps } from '@ngneat/elf';
import {
    persistState
} from '@ngneat/elf-persist-state';
import { localForageStore } from '@ul/shared';

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
    storage: localForageStore,
});

export const markersList$ = markersStore.pipe(select((state) => state.markers));

export const setMarkers = (markers: MarkersProps['markers']) => {
    markersStore.update((state) => ({
      ...state,
      markers,
    }));
};
