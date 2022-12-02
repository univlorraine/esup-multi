import { Injectable } from '@angular/core';
import { AuthorizationHelper, WithAuthorization } from '../authorization/authorization.helper';

interface RawTile {
    title: string;
    icon: string;
    position: number;
    path: string;
    description: string;
}

export type Tile = WithAuthorization<RawTile>;

@Injectable({
    providedIn: 'root'
})
export class TileService {

    private tiles: Tile[] = [];

    public addTiles(tiles: Tile[]) {
        this.tiles.push(...tiles);
        this.tiles.sort((itemA, itemB) => itemA.position - itemB.position);
    }

    public getTiles(userRoles: string[]) {
        return new AuthorizationHelper(userRoles).filter(this.tiles);
    }
}
