import { Injectable, Type } from '@angular/core';
import { MenuItem, MenuService, MenuType } from './menu.service';
import { PreferencesService } from './preferences.service';
import { TranslationsService } from './translations/translations.service';
import { Widget, WidgetsService } from './widgets.service';
import { PageConfiguration, PageConfigurationService } from './page-configuration.service';

export interface InitProjectModuleOptions {
    name: string;
    preferencesComponent?: Type<any>;
    translation?: boolean;
    menuItems?: MenuItem[];
    widgets?: Widget[];
    pageConfigurations?: PageConfiguration[];
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
        private pageConfigurationService: PageConfigurationService,
    ) {}

    initProjectModule(options: InitProjectModuleOptions) {
        if (options.preferencesComponent) {
            this.preferencesService.addPreferencesComponent(options.preferencesComponent);
        }

        if (options.translation === true) {
            this.translationsService.addTranslation(options.name);
        }

        if (options.menuItems) {
            this.menuService.addMenuItems(options.menuItems);
        }

        if (options.widgets) {
            // prefix widgets ids with module name
            const widgets = options.widgets.map(widget => ({
                id: `${options.name}:${widget.id}`,
                component: widget.component
            }));
            this.widgetsService.addWidgets(widgets);
        }

        if (options.pageConfigurations) {
            this.pageConfigurationService.addPageConfigurations(options.pageConfigurations);
        }
    }

    getTranslatedProjectModules(): string[] {
        return this.translationsService.getTranslations();
    }

    getMenuItemsByType(menuType: MenuType): MenuItem[] {
        return this.menuService.getMenuItemsByType(menuType);
    }

    getPreferencesComponents(): Type<any>[] {
        return this.preferencesService.getPreferencesComponents();
    }

    getWidgetComponent(widgetId: string): Type<any> {
        return this.widgetsService.getWidget(widgetId)?.component;
    }

    getPageConfigurationByPath(path: string): PageConfiguration {
        return this.pageConfigurationService.getPageConfigurationByPath(path);
    }
}
