import * as LocalForage from 'localforage';

export const localForageStore = LocalForage.createInstance({
    driver: LocalForage.INDEXEDDB,
    name: 'multi',
    version: 1.0,
});

export { LocalForage };
