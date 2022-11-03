import { Type } from '@angular/core';
import { Injectable } from '@angular/core';
import { MenuItem, MenuService } from './menu.service';
import { PreferencesService } from './preferences.service';
import { TranslationsService } from './translations/translations.service';

export interface InitProjectModuleOptions {
    name: string;
    preferencesComponent?: Type<any>;
    translation?: boolean;
    menuItem?: MenuItem;
}

@Injectable({
    providedIn: 'root'
})
export class ProjectModuleService {

    private initializedProjectModules = new Set<string>();

    constructor(
        private preferencesService: PreferencesService,
        private translationsService: TranslationsService,
        private menuService: MenuService,
    ) {}

    initProjectModule(options: InitProjectModuleOptions) {
        // prevent multiple initialization
        if (this.initializedProjectModules.has(options.name)) {
            return;
        }

        this.initializedProjectModules.add(options.name);

        if (options.preferencesComponent) {
            this.preferencesService.addPreferencesComponent(options.preferencesComponent);
        }

        if (options.translation === true) {
            this.translationsService.addTranslation(options.name);
        }

        if (options.menuItem) {
            this.menuService.addMenuItem(options.menuItem);
        }
    }

    getTranslatedProjectModules(): string[] {
        return this.translationsService.getTranslations();
    }

    getMenuItems(): MenuItem[] {
        return this.menuService.getMenuItems();
    }

    getPreferencesComponents(): Type<any>[] {
        return this.preferencesService.getPreferencesComponents();
    }
}
