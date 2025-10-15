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

import { Component, Inject } from '@angular/core';
import { Router } from '@angular/router';
import { currentLanguage$, StatisticsService, ThemeService } from '@multi/shared';
import { combineLatest, Observable } from 'rxjs';
import { finalize, map, take } from 'rxjs/operators';
import { ImportantNews, importantNewsList$, setImportantNews as setImportantNewsList } from '../../important-news.repository';
import { ImportantNewsService } from '../../important-news.service';
import { TranslatedImportantNews } from '../../important-news.repository';
import { IMPORTANT_NEWS_CONFIG, ImportantNewsModuleConfig } from '../../important-news.config';
import { NavigationService } from '@multi/shared';


@Component({
  selector: 'app-important-news-widget',
  templateUrl: './important-news.component.html',
  styleUrls: ['../../../../../../src/theme/app-theme/styles/important-news/important-news.component.scss'],
})
export class ImportantNewsComponent {


  public isLoading = false;
  public importantNewsList$: Observable<ImportantNews[]> = importantNewsList$;
  public isEmpty$: Observable<boolean>;
  public translatedImportantNewsList$: Observable<TranslatedImportantNews[]>;
  public randomImportantNews$: Observable<TranslatedImportantNews | undefined>;


  constructor(
    private importantNewsService: ImportantNewsService,
    private router: Router,
    private statisticsService: StatisticsService,
    private themeService: ThemeService,
    private navigationService: NavigationService,
    @Inject(IMPORTANT_NEWS_CONFIG) public config: ImportantNewsModuleConfig,
  ) {
    this.isEmpty$ = this.importantNewsList$.pipe(
      map(importantNewsList => !importantNewsList || importantNewsList.length === 0)
    );

    this.translatedImportantNewsList$ = combineLatest([this.importantNewsList$, currentLanguage$])
      .pipe(
        map(importantNewsListAndCurrentLang => this.importantNewsService.mapToTranslatedImportantNews(importantNewsListAndCurrentLang))
      );

    this.randomImportantNews$ = this.translatedImportantNewsList$.pipe(
      map(translatedImportantNewsList => {
        if (!translatedImportantNewsList || translatedImportantNewsList.length === 0) {
          return undefined;
        }
        const randomIndex = Math.floor(Math.random() * translatedImportantNewsList.length);
        return translatedImportantNewsList[randomIndex];
      })
    );
  }

  widgetViewDidEnter(): void {
    this.isLoading = true;
    this.importantNewsService.loadImportantNewsList().pipe(
      take(1),
      finalize(() => this.isLoading = false)
    ).subscribe(importantNewsList => {
      setImportantNewsList(importantNewsList);
    });
  }

  public onClick(importantNews: TranslatedImportantNews): Promise<void | boolean> {
    if (!importantNews.link) {
      return;
    }

    this.statisticsService.onFunctionalityOpened(importantNews.statisticName);

    if (importantNews.link.startsWith('/')) {
      return this.router.navigateByUrl(importantNews.link);
    } else {
      return this.navigationService.openExternalLink(importantNews.link);
    }
  }

  fontColor(backgroundColor) {
    return this.themeService.isBackgroundFromCmsDarkOrIsDarkTheme(backgroundColor) ?
      'light-font-color' : 'dark-font-color';
  }
}
