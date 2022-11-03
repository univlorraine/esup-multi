import { HttpClient } from '@angular/common/http';
import { IModuleTranslationOptions, ModuleTranslateLoader } from '@larscom/ngx-translate-module-loader';
import { ProjectModuleService } from '../project-module.service';

export const translationsLoaderFactory = (http: HttpClient, projectModuleService: ProjectModuleService) => {
    const baseTranslateUrl = './assets/i18n';

    const translations = projectModuleService.getTranslatedProjectModules().map(projectModule => ({
      baseTranslateUrl, moduleName: projectModule
    }));

    const options: IModuleTranslationOptions = {
      modules: [
        { baseTranslateUrl },
        ...translations,
      ]
    };

    return new ModuleTranslateLoader(http, options);
};
