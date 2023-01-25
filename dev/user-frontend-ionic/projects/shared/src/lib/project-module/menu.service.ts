import { Injectable } from '@angular/core';

export interface MenuItem {
    title: string;
    icon: string;
    position: number;
    path: string;
}

@Injectable({
    providedIn: 'root'
})
export class MenuService {

    private menuItems: MenuItem[] = [];

    public addMenuItem(menuItem: MenuItem) {
        this.menuItems.push(menuItem);
        this.menuItems.sort((itemA, itemB) => itemA.position - itemB.position);
    }

    public getMenuItems() {
        return this.menuItems;
    }

}
