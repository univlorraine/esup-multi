import { Injectable } from '@angular/core';

export type MenuType = 'top' | 'tabs' | 'burger';

export interface MenuItem {
    title: string;
    icon: string;
    position: number;
    routerLink: string;
    type: MenuType;
}

@Injectable({
    providedIn: 'root'
})
export class MenuService {

    private menuItemsByType: Map<MenuType, MenuItem[]> = new Map([
        ['top', []],
        ['tabs', []],
        ['burger', []],
    ]);

    private menuItems: MenuItem[] = [];

    public addMenuItems(menuItems: MenuItem[]) {
        menuItems.forEach(menuItem => this.addMenuItem(menuItem));
    }

    public getMenuItemsByType(menuType: MenuType) {
        return this.menuItemsByType.get(menuType);
    }

    public getMenuItems() {
        return this.menuItems;
    }

    private addMenuItem(menuItem: MenuItem) {
        const menuItemsForThisType = this.menuItemsByType.get(menuItem.type);
        menuItemsForThisType.push(menuItem);
        menuItemsForThisType.sort((itemA, itemB) => itemA.position - itemB.position);

        this.menuItems.push(menuItem);
    }
}
