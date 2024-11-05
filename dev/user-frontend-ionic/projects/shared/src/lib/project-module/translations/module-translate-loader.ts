/**
 * Ce fichier inclut du code provenant de ngx-translate-module-loader, qui est
 * licencié sous la licence MIT.
 *
 * Avis de Licence MIT:
 *
 * Copyright (c) 2019 Lars Kniep
 *
 * La présente autorisation est accordée, gracieusement, à toute personne
 * obtenant une copie de ce logiciel et des fichiers de documentation
 * associés (le « logiciel »), pour interagir avec le logiciel sans
 * restriction, y compris, sans limitation, les droits à utiliser, copier,
 * modifier, fusionner, publier, distribuer, accorder des sous-licences et/ou
 * vendre des copies du logiciel, et de permettre aux personnes à qui le
 * logiciel est fourni à le faire sous réserve des conditions suivantes :
 *
 * La mention de droit d’auteur ci-dessus et cette clause d’autorisation
 * doivent être incluses dans toutes les copies ou parties substantielles du
 * logiciel.
 *
 * LE LOGICIEL EST FOURNI « TEL QUEL », SANS GARANTIE D’AUCUNE SORTE, EXPRESSE
 * OU TACITE, Y COMPRIS, MAIS SANS S’Y LIMITER, LES GARANTIES DE QUALITÉ
 * MARCHANDE,D’ADÉQUATION À UN USAGE PARTICULIER ET LE RESPECT DE LA PROPRIÉTÉ
 * INTELLECTUELLE. EN AUCUN CAS, LES AUTEURS OU LES DÉTENTEURS DE DROITS
 * D’AUTEUR NE PEUVENT ÊTRE TENUS RESPONSABLES DE TOUTE RÉCLAMATION, DOMMAGE
 * OU AUTRE RESPONSABILITÉ, QUE CE SOIT DANS LE CADRE D’UNE ACTION
 * CONTRACTUELLE, DÉLICTUELLE OU AUTRE, DÉCOULANT DU LOGICIEL OU DE SON
 * UTILISATION OU D’AUTRES INTERACTIONS AVEC LE LOGICIEL, OU EN RELATION AVEC
 * CEUX-CI.
 *
 *
 *
 * Tout autre code dans ce fichier est licencié sous la licence CeCILL 2.1 :
 *
 * Copyright ou © ou Copr. Université de Lorraine, (2022)
 *
 * Direction du Numérique de l'Université de Lorraine - SIED
 *  (dn-mobile-dev@univ-lorraine.fr)
 * JNESIS (contact@jnesis.com)
 *
 * Ce logiciel est un programme informatique servant à rendre accessible
 * sur mobile divers services universitaires aux étudiants et aux personnels
 * de l'université.
 *
 * Ce logiciel est régi par la licence CeCILL 2.1, soumise au droit français
 * et respectant les principes de diffusion des logiciels libres. Vous pouvez
 * utiliser, modifier et/ou redistribuer ce programme sous les conditions
 * de la licence CeCILL telle que diffusée par le CEA, le CNRS et INRIA
 * sur le site "http://cecill.info".
 *
 * En contrepartie de l'accessibilité au code source et des droits de copie,
 * de modification et de redistribution accordés par cette licence, il n'est
 * offert aux utilisateurs qu'une garantie limitée. Pour les mêmes raisons,
 * seule une responsabilité restreinte pèse sur l'auteur du programme, le
 * titulaire des droits patrimoniaux et les concédants successifs.
 *
 * À cet égard, l'attention de l'utilisateur est attirée sur les risques
 * associés au chargement, à l'utilisation, à la modification et/ou au
 * développement et à la reproduction du logiciel par l'utilisateur étant
 * donné sa spécificité de logiciel libre, qui peut le rendre complexe à
 * manipuler et qui le réserve donc à des développeurs et des professionnels
 * avertis possédant des connaissances informatiques approfondies. Les
 * utilisateurs sont donc invités à charger et à tester l'adéquation du
 * logiciel à leurs besoins dans des conditions permettant d'assurer la
 * sécurité de leurs systèmes et/ou de leurs données et, plus généralement,
 * à l'utiliser et à l'exploiter dans les mêmes conditions de sécurité.
 *
 * Le fait que vous puissiez accéder à cet en-tête signifie que vous avez
 * pris connaissance de la licence CeCILL 2.1, et que vous en avez accepté les
 * termes.
 */

import {HttpClient, HttpErrorResponse} from '@angular/common/http';
import { TranslateLoader } from '@ngx-translate/core';
import { mergeDeepRight, reduce } from 'ramda';
import { forkJoin as ForkJoin, MonoTypeOperatorFunction, Observable, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { HttpHeaders } from '@capacitor/core';
import { MultiTenantService } from '../../multi-tenant/multi-tenant.service';

export type Translation = object;

export interface ModuleTranslationOptions {
  modules: ModuleTranslation[];
  disableNamespace?: boolean;
  lowercaseNamespace?: boolean;
  deepMerge?: boolean;
  version?: string | number;
  translateError?: (error: any, path: string) => void;
  translateMerger?: (translations: Translation[]) => Translation;
  headers?: HttpHeaders;
}

export interface ModuleTranslation {
  moduleName?: string;
  baseTranslateUrl: string;
  namespace?: string;
  translateMap?: (translation: Translation) => Translation;
  pathTemplate?: string;
  headers?: HttpHeaders;
}

const concatJson = (path: string) => path.concat('.json');

const PATH_TEMPLATE_REGEX = /{([^}]+)}/gi;
const PATH_CLEAN_REGEX = /([^:]\/)\/+/gi;
const DEFAULT_PATH_TEMPLATE = '{baseTranslateUrl}/{moduleName}/{fileFolder}/{filename}';

export class ModuleTranslateLoader implements TranslateLoader {
  private readonly defaultOptions: ModuleTranslationOptions = {
    disableNamespace: false,
    lowercaseNamespace: false,
    deepMerge: true,
    ...this.options
  };

  constructor(
    private readonly http: HttpClient,
    private readonly options: ModuleTranslationOptions,
    private multiTenantService: MultiTenantService
  ) {}

  public getTranslation(language: string): Observable<Translation> {
    const { defaultOptions: options } = this;
    return this.mergeTranslations(this.getModuleTranslations(language, options), options);
  }

  private getTenantTranslationFolder() {
    const tenantId = this.multiTenantService.getSelectedTenantId();
    if(tenantId) {
      return tenantId.toLowerCase();
    }
    return '';
  }

  private mergeTranslations(
    moduleTranslations: Observable<Translation>[],
    { deepMerge, translateMerger }: ModuleTranslationOptions
  ): Observable<Translation> {
    return ForkJoin(moduleTranslations).pipe(
      map((translations) =>
        translateMerger ?
          translateMerger(translations) :
          deepMerge ?
            reduce(mergeDeepRight, Object(), translations) :
            translations.reduce((acc, curr) => ({ ...acc, ...curr }), Object()))
    );
  }

  private getModuleTranslations(language: string, options: ModuleTranslationOptions): Observable<Translation>[] {
    const { modules } = options;

    // Fetches the translations by module
    // If byTenant=true, will also fetch by tenant, retrieving the specific translation file associated with the current tenant
    const fetchTranslation = (module: ModuleTranslation, byTenant: boolean): Observable<Translation> => {
      const { moduleName } = module;
      return moduleName ?
        this.fetchTranslationForModule(language, options, module, byTenant) :
        this.fetchTranslation(language, options, module, byTenant);
    };

    // If no tenant, no need to merge
    if(!this.multiTenantService.getSelectedTenantId()) {
      return modules.map((module) => fetchTranslation(module, false));
    }

    // If there's a tenant currently selected, we'll return a merge between the default translation and the tenant's one,
    // with priority to the tenant translation
    return modules.map((module) =>
      this.mergeTranslations(
        [fetchTranslation(module, false), fetchTranslation(module, true)],
        { ...options, deepMerge: true, translateMerger: null }
      )
    );
  }

  private fetchTranslation(
    language: string,
    { translateError, version, headers }: ModuleTranslationOptions,
    { pathTemplate, baseTranslateUrl, translateMap }: ModuleTranslation,
    byTenant: boolean = false
  ): Observable<Translation> {
    const pathOptions = Object({
      baseTranslateUrl,
      filename: language,
      fileFolder: byTenant ? this.getTenantTranslationFolder() : ''
    });
    const template = pathTemplate || DEFAULT_PATH_TEMPLATE;

    const cleanedPath = concatJson(
      template.replace(PATH_TEMPLATE_REGEX, (_, m1: string) => pathOptions[m1] || '')
    ).replace(PATH_CLEAN_REGEX, '$1');

    const path = version ? `${cleanedPath}?v=${version}` : cleanedPath;

    return this.http.get<Translation>(path, { headers }).pipe(
      map((translation) => (translateMap ? translateMap(translation) : translation)),
      this.catchError(cleanedPath, translateError, byTenant)
    );
  }

  private fetchTranslationForModule(
    language: string,
    { disableNamespace, lowercaseNamespace, translateError, version, headers }: ModuleTranslationOptions,
    { pathTemplate, baseTranslateUrl, moduleName, namespace, translateMap, headers: moduleHeaders }: ModuleTranslation,
    byTenant: boolean = false
  ): Observable<Translation> {
    const pathOptions = Object({
      baseTranslateUrl: `${baseTranslateUrl}/modules`,
      moduleName,
      filename: language,
      fileFolder: byTenant ? this.getTenantTranslationFolder() : ''
    });
    const template = pathTemplate || DEFAULT_PATH_TEMPLATE;

    const namespaceKey = namespace
      ? namespace
      : lowercaseNamespace
        ? moduleName.toLowerCase()
        : moduleName.toUpperCase();

    const cleanedPath = concatJson(
      template.replace(PATH_TEMPLATE_REGEX, (_, m1: string) => pathOptions[m1] || '')
    ).replace(PATH_CLEAN_REGEX, '$1');

    const path = version ? `${cleanedPath}?v=${version}` : cleanedPath;

    return this.http.get<Translation>(path, { headers: moduleHeaders || headers }).pipe(
      map((translation) =>
        translateMap
          ? translateMap(translation)
          : disableNamespace
            ? translation
            : Object({ [namespaceKey]: translation })
      ),
      this.catchError(cleanedPath, translateError, byTenant)
    );
  }

  private catchError<T>(
    path: string,
    translateError?: (error: any, path: string) => void,
    fetchedByTenant: boolean = false
  ): MonoTypeOperatorFunction<T> {
    return catchError((e: HttpErrorResponse) => {
      if(fetchedByTenant && e.status === 404) {
        return of(Object()); // Do not throw error if the file wasn't found when fetching for tenant
      }

      if (translateError) {
        translateError(e, path);
      }

      console.error('Unable to load translation file:', path);
      return of(Object());
    });
  }
}
