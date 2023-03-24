import { Injectable } from '@angular/core';

export type StaticMenuType = 'tabs:start' | 'tabs:end' | 'burger';

export interface StaticMenuItem {
    title: string;
    icon: string;
    position: number;
    routerLink: string;
    type: StaticMenuType;
}

@Injectable({
    providedIn: 'root'
})
export class StaticMenuService {

    private menuItemsByType: Map<StaticMenuType, StaticMenuItem[]> = new Map([
        ['tabs:start', []],
        ['tabs:end', []],
        ['burger', []],
    ]);

    private menuItems: StaticMenuItem[] = [];

    public addMenuItems(menuItems: StaticMenuItem[]) {
        menuItems.forEach(menuItem => this.addMenuItem(menuItem));
    }

    public getMenuItemsByType(menuType: StaticMenuType) {
        return this.menuItemsByType.get(menuType);
    }

    public getMenuItems() {
        return this.menuItems;
    }

    private addMenuItem(menuItem: StaticMenuItem) {
        const menuItemsForThisType = this.menuItemsByType.get(menuItem.type);
        menuItemsForThisType.push(menuItem);
        menuItemsForThisType.sort((itemA, itemB) => itemA.position - itemB.position);

        this.menuItems.push(menuItem);
    }
}
