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

import { Inject, Injectable } from '@angular/core';
import { createStore, select, withProps } from '@ngneat/elf';
import { persistState } from '@ngneat/elf-persist-state';
import { currentLanguage$, localForageStore } from '@multi/shared';
import { combineLatest } from 'rxjs';
import { filter, map } from 'rxjs/operators';


interface ContactUsProps {
  pageContent: ContactUsPageContent | null;
}

export interface ContactUsPageContent {
  icon?: string;
  translations?: Translation[];
}

export interface TranslatedContactUsPageContent {
  title: string;
  content: string;
  icon?: string;
}

interface Translation {
  // eslint-disable-next-line @typescript-eslint/naming-convention
  languages_code: string;
  title: string;
  content: string;
}

const STORE_NAME = 'contact-us';

const store = createStore(
  { name: STORE_NAME },
  withProps<ContactUsProps>({ pageContent: null })
);

export const persist = persistState(store, {
  key: STORE_NAME,
  storage: localForageStore,
});

@Injectable({ providedIn: 'root' })
export class ContactUsRepository {

  private pageContent$ = store.pipe(select((state) => state.pageContent));

  //eslint-disable-next-line @typescript-eslint/member-ordering
  public translatedPageContent$ = combineLatest([this.pageContent$, currentLanguage$]).pipe(
    filter(([pageContent]) => pageContent !== null),
    map(([pageContent, currentLanguage]) => {
      const translation = pageContent.translations.find((t) => t.languages_code === currentLanguage) ||
        pageContent.translations.find((t) => t.languages_code === this.environment.defaultLanguage) ||
        pageContent.translations[0];

      return {
        title: translation.title,
        content: translation.content,
        icon: pageContent.icon,
      };
    })
  );

  constructor(
    @Inject('environment')
    private environment: any,) {
  }

  public setPageContent = (pageContent: ContactUsPageContent) => {
    store.update((state) => ({
      ...state,
      pageContent,
    }));
  };

}
