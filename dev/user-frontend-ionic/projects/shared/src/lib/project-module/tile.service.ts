import { Injectable } from '@angular/core';

export interface TileItem {
    title: string;
    icon: string;
    position: number;
    path: string;
    description: string;
    roles?: string[];
}

@Injectable({
    providedIn: 'root'
})
export class TileService {

    private tileItems: TileItem[] = [];

    public addTileItems(tileItems: TileItem[]) {
        this.tileItems.push(...tileItems);
        this.tileItems.sort((itemA, itemB) => itemA.position - itemB.position);
    }

    public getTileItems() {
        return this.tileItems;
    }
}
