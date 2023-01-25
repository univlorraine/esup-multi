import { Injectable, Type } from '@angular/core';
import { MenuItem, MenuService } from './menu.service';
import { PreferencesService } from './preferences.service';
import { TranslationsService } from './translations/translations.service';
import { Widget, WidgetsService } from './widgets.service';

export interface InitProjectModuleOptions {
    name: string;
    preferencesComponent?: Type<any>;
    translation?: boolean;
    menuItem?: MenuItem;
    widgets?: Widget[];
}

@Injectable({
    providedIn: 'root'
})
export class ProjectModuleService {

    constructor(
        private preferencesService: PreferencesService,
        private translationsService: TranslationsService,
        private menuService: MenuService,
        private widgetsService: WidgetsService,
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

        if (options.widgets) {
            // prefix widgets ids with module name
            const widgets = options.widgets.map(widget => ({
                id: `${options.name}:${widget.id}`,
                ...widget
            }));
            this.widgetsService.addWidgets(widgets);
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

    getWidgetComponent(widgetId: string): Type<any> {
        return this.widgetsService.getWidget(widgetId).component;
    }
}
