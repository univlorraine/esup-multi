import { createStore, withProps, select } from '@ngneat/elf';

interface MenuItem {
    title: string;
    icon: string;
    position: number;
    path: string;
}

interface MenuProps {
    items: MenuItem[];
}

const menuStore = createStore(
    { name: 'menu' },
    withProps<MenuProps>({ items: [] })
  );

export const menuItems$ = menuStore.pipe(select((state) => state.items));

export const addMenuItem = (item: MenuItem) => {
    menuStore.update((state) => ({
        ...state,
        items: [...state.items, item]
    }));
}