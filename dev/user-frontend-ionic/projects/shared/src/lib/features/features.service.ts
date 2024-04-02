/*
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

import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { combineLatest, Observable, ReplaySubject } from 'rxjs';
import { filter, map, share, switchMap, take, tap } from 'rxjs/operators';
import { getAuthToken } from '../auth/auth.repository';
import { Authorization } from '../authorization/authorization.helper';
import { currentLanguage$ } from '../i18n/i18n.repository';
import { Feature, FeatureMenuType, features$, FeatureType, isFeatureStoreInitialized$, setFeatures } from './features.repository';

interface TranslatedFeatureCommon {
  id: string;
  type: FeatureType;
  widget: string;
  color?: string;
  title: string;
  shortTitle?: string;
  content?: string;
  authorization?: Authorization;
  searchKeywords?: string[];
  menu: FeatureMenuType;
  icon: string;
  iconSourceSvgLightTheme?: string;
  iconSourceSvgDarkTheme?: string;
  isNew: boolean;
  statisticName?: string;
}

export interface TranslatedInternalFeature extends TranslatedFeatureCommon {
  routerLink: string;
  type: FeatureType.internal;
}

export interface TranslatedExternalFeature extends TranslatedFeatureCommon {
  link?: string;
  ssoService?: string;
  type: FeatureType.external;
}

export type TranslatedFeature = TranslatedExternalFeature | TranslatedInternalFeature;
@Injectable({
  providedIn: 'root'
})
export class FeaturesService {

  public translatedFeatures$: Observable<TranslatedFeature[]>;
  private translatedFeaturesSubject$ = new ReplaySubject<TranslatedFeature[]>();

  constructor(
    @Inject('environment')
    private environment: any,
    private http: HttpClient,
  ) {
    this.translatedFeatures$ = this.translatedFeaturesSubject$;

    combineLatest([
      features$,
      currentLanguage$,
      isFeatureStoreInitialized$.pipe(filter(initialized => initialized === true))
    ])
      .pipe(
        map(([features, currentLanguage]) => this.translate(features, currentLanguage)),
        share(),
      ).subscribe(this.translatedFeaturesSubject$);
  }

  loadAndStoreFeatures(): Observable<void> {

    return getAuthToken().pipe(
      take(1),
      switchMap((authToken) => this.getFeatures(authToken)),
      tap(features => setFeatures(features)),
      map(() => null)
    );
  }

  private getFeatures(authToken: string): Observable<Feature[]> {
    const url = `${this.environment.apiEndpoint}/features`;
    const data = {
      authToken,

    };
    return this.http.post<Feature[]>(url, data);
  }

  private translate(features: Feature[], currentLanguage: string): TranslatedFeature[] {
    return features.map(feature => {
      // On recherche le contenu du service en fonction de la langue choisie par l'utilisateur
      // Si le contenu traduit n'est pas trouvé dans la langue souhaitée, on prend le contenu dans la langue par défaut
      // Si, ni la langue courante, ni la langue par défaut n'ont été trouvées, on prend la première traduction disponible
      const translation =
        /* eslint-disable @typescript-eslint/naming-convention */
        feature.translations.find((t) => t.languages_code === currentLanguage) ||
        feature.translations.find((t) => t.languages_code === this.environment.defaultLanguage) ||
        feature.translations[0];

      /* eslint-enable @typescript-eslint/naming-convention */
      return {
        ...feature,
        title: translation?.title,
        shortTitle: translation?.shortTitle,
        content: translation?.content,
        searchKeywords: translation?.searchKeywords,
      };
    });
  }

}
