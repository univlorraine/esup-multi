import { Injectable, Type } from '@angular/core';
import { MenuItem, MenuService } from './menu.service';
import { PreferencesService } from './preferences.service';
import { Tile, TileService } from './tile.service';
import { TranslationsService } from './translations/translations.service';

export interface InitProjectModuleOptions {
    name: string;
    preferencesComponent?: Type<any>;
    translation?: boolean;
    menuItem?: MenuItem;
    tiles?: Tile[];
}

@Injectable({
    providedIn: 'root'
})
export class ProjectModuleService {

    constructor(
        private preferencesService: PreferencesService,
        private translationsService: TranslationsService,
        private menuService: MenuService,
        private tileService: TileService,
    ) {}

    initProjectModule(options: InitProjectModuleOptions) {
        if (options.preferencesComponent) {
            this.preferencesService.addPreferencesComponent(options.preferencesComponent);
        }

        if (options.translation === true) {
            this.translationsService.addTranslation(options.name);
        }

        if (options.menuItem) {
            this.menuService.addMenuItem(options.menuItem);
        }

        if (options.tiles) {
            this.tileService.addTiles(options.tiles);
        }
    }

    getTranslatedProjectModules(): string[] {
        return this.translationsService.getTranslations();
    }

    getMenuItems(): MenuItem[] {
        return this.menuService.getMenuItems();
    }

    getTiles(userRoles: string[]): Tile[] {
        return this.tileService.getTiles(userRoles);
    }

    getPreferencesComponents(): Type<any>[] {
        return this.preferencesService.getPreferencesComponents();
    }
}
