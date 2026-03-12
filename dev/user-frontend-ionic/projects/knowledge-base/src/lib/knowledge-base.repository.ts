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

import {createStore} from '@ngneat/elf';
import {
  persistState
} from '@ngneat/elf-persist-state';
import {currentLanguage$, localForageStore} from '@multi/shared';
import {
  selectAllEntities,
  setEntities,
  withEntities
} from "@ngneat/elf-entities";
import {combineLatest, Observable} from "rxjs";
import {map} from "rxjs/operators";
import {Inject, Injectable} from "@angular/core";

export enum Display {
  card = 'card',
  list = 'list',
}

export enum Type {
  content = 'content',
  externalLink = 'external_link',
  internalLink = 'internal_link',
}

export interface KnowledgeBaseItem {
  id: string,
  type: Type,
  parentId?: string,
  routerLink?: string
  link?: string,
  ssoService?: string,
  email?: string,
  phone?: string,
  address?: string,
  childDisplay?: Display,
  display?:Display,
  translations?: Translation[],
  coverImage?: string;
  isLeaf?: boolean
}

export interface TranslatedKnowledgeBaseItem {
  id: string,
  type: Type,
  parentId?: string,
  content?: string
  title?: string,
  routerLink?: string
  link?: string,
  ssoService?: string,
  email?: string,
  phone?: string,
  address?: string,
  childDisplay?: Display,
  display?:Display,
  coverImage?: string;
  searchKeywords?: string[];
  isLeaf?: boolean
}

interface Translation {
  languagesCode: string;
  title: string;
  content: string;
  searchKeywords?: string[];
}

const STORE_NAME = 'knowledgeBase';

const store = createStore(
  {name: STORE_NAME},
  withEntities<KnowledgeBaseItem>(),
);

export const persist = persistState(store, {
  key: STORE_NAME,
  storage: localForageStore,
});

@Injectable({providedIn: 'root'})
export class KnowledgeBaseRepository {

  constructor(
    @Inject('environment')
    private environment: any,) {
  }

  private translatedKnowledgeBases$: Observable<TranslatedKnowledgeBaseItem[]> = combineLatest([
    store.pipe(selectAllEntities()),
    currentLanguage$]
  ).pipe(
    map(([knowledgeBases, currentLanguage]) => knowledgeBases.map(knowledgeBase => {
      const translation = knowledgeBase.translations.find((t) => t.languagesCode === currentLanguage) ||
        knowledgeBase.translations.find((t) => t.languagesCode === this.environment.defaultLanguage) ||
        knowledgeBase.translations[0];
      return {
        ...knowledgeBase,
        title: translation.title,
        content: translation.content,
        searchKeywords: translation.searchKeywords,
      };
    }))
  );

  public setKnowledgeBases = (knowledgeBaseItems: KnowledgeBaseItem[]) => {
    this.updateDisplayFromParent(knowledgeBaseItems);
    store.update(setEntities(knowledgeBaseItems));
  };

  private updateDisplayFromParent(knowledgeBaseItems: KnowledgeBaseItem[]) {
    knowledgeBaseItems.forEach(item => {
      const children = knowledgeBaseItems.filter(child => child.parentId === item.id);
      item.display = (item.type===Type.content && children.length === 0) ? Display.card : undefined;

      if (!item.parentId || item.display)
        return

      const parent = knowledgeBaseItems.find((parent) => parent.id === item.parentId);
      item.display = parent.childDisplay;
    })
  }

  public getKnowledgeBase = ():Observable<TranslatedKnowledgeBaseItem[]> =>
    this.translatedKnowledgeBases$.pipe(
      map(items => items.filter(item => !item.parentId))
    );

  public getKnowledgeBaseByParentId = (parentId: string): Observable<TranslatedKnowledgeBaseItem[]> =>
    this.translatedKnowledgeBases$.pipe(
      map(allItems => {
        const children = allItems.filter(item => item.parentId === parentId);
        const parentIds = new Set(allItems.map(item => item.parentId).filter(id => id !== null));
        return children.map(child => ({
          ...child,
          isLeaf: !parentIds.has(child.id)
        }));
      })
    );

  public getKnowledgeBaseItemById = (id: string): Observable<TranslatedKnowledgeBaseItem> =>
    this.translatedKnowledgeBases$.pipe(
      map(items => items.find(item => item.id === id))
    );

  public searchKnowledgeBase = (text: string): Observable<TranslatedKnowledgeBaseItem[]> =>
    this.translatedKnowledgeBases$.pipe(
      map(items => items.filter( item =>
        item.title.toLowerCase().includes(text) ||
        item.content?.toLowerCase().includes(text) ||
        item.searchKeywords?.some(key => key.toLowerCase().includes(text.toLowerCase()))
      ))
    );
}


