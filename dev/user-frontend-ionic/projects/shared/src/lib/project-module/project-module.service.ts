import { Injectable, Type } from '@angular/core';
import { StaticMenuItem, StaticMenuService, StaticMenuType } from './static-menu.service';
import { PreferencesService } from './preferences.service';
import { TranslationsService } from './translations/translations.service';
import { Widget, WidgetsService } from './widgets.service';
import { HistoryBlacklistService } from './history-blacklist.service';

export interface InitProjectModuleOptions {
    name: string;
    preferencesComponent?: Type<any>;
    translation?: boolean;
    menuItems?: StaticMenuItem[];
    widgets?: Widget[];
    historyBlacklist?: string[];
}

@Injectable({
    providedIn: 'root'
})
export class ProjectModuleService {

    constructor(
        private preferencesService: PreferencesService,
        private translationsService: TranslationsService,
        private staticMenuService: StaticMenuService,
        private widgetsService: WidgetsService,
        private historyBlacklistService: HistoryBlacklistService,
    ) {}

    initProjectModule(options: InitProjectModuleOptions) {
        if (options.preferencesComponent) {
            this.preferencesService.addPreferencesComponent(options.preferencesComponent);
        }

        if (options.translation === true) {
            this.translationsService.addTranslation(options.name);
        }

        if (options.menuItems) {
            this.staticMenuService.addMenuItems(options.menuItems);
        }

        if (options.widgets) {
            // prefix widgets ids with module name
            const widgets = options.widgets.map(widget => ({
                id: `${options.name}:${widget.id}`,
                component: widget.component
            }));
            this.widgetsService.addWidgets(widgets);
        }

        if (options.historyBlacklist) {
            this.historyBlacklistService.addHistoryBlacklist(options.historyBlacklist);
        }
    }

    getTranslatedProjectModules(): string[] {
        return this.translationsService.getTranslations();
    }

    getStaticMenuItemsByType(menuType: StaticMenuType): StaticMenuItem[] {
        return this.staticMenuService.getMenuItemsByType(menuType);
    }

    getStaticMenuItems(): StaticMenuItem[] {
        return this.staticMenuService.getMenuItems();
    }

    getPreferencesComponents(): Type<any>[] {
        return this.preferencesService.getPreferencesComponents();
    }

    getWidgetComponent(widgetId: string): Type<any> {
        return this.widgetsService.getWidget(widgetId)?.component;
    }

    getHistoryBlacklist(): string[] {
        return this.historyBlacklistService.getHistoryBlacklist();
    }
}
