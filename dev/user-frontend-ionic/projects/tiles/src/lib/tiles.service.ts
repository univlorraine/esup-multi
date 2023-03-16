import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { currentLanguage$, NavigationService, PageLayoutsService } from '@ul/shared';
import { BehaviorSubject, combineLatest, Observable } from 'rxjs';
import { filter, map, share } from 'rxjs/operators';
import { Tile, tiles$, TileType, TranslatedApp, TranslatedTile } from './tiles.repository';

@Injectable({
  providedIn: 'root'
})
export class TilesService {

  public translatedTiles$: Observable<TranslatedTile[]>;
  private translatedTilesSubject$ = new BehaviorSubject<TranslatedTile[]>([]);

  constructor(
    @Inject('environment')
    private environment: any,
    private http: HttpClient,
    private navigationService: NavigationService,
    private pageLayoutService: PageLayoutsService,
  ) {
    this.translatedTiles$ = this.translatedTilesSubject$;

    combineLatest([tiles$, currentLanguage$])
      .pipe(
        map(tilesAndCurrentLang => this.mapToTranslatedTiles(tilesAndCurrentLang)),
        share(),
    ).subscribe(this.translatedTilesSubject$);

    // set current page title if current routerLink matches any app tile
    combineLatest([this.navigationService.navigationRouterLink$, this.translatedTiles$]).pipe(
      map(([navigationRouterLink, tiles]) => tiles
        .filter(tile => tile.type === TileType.app)
        .map(tile =>  tile as TranslatedApp)
        .find(tile => navigationRouterLink.current.startsWith(tile.routerLink))
      ),
      filter(translatedApp => translatedApp !== undefined),
      map(translatedApp => ({
        title: translatedApp.title,
        translated: true
      }))
    ).subscribe(this.pageLayoutService.currentPageTitle$);
  }

  public getTiles(authToken: string): Observable<Tile[]> {
    const url = `${this.environment.apiEndpoint}/tiles`;
    const data = {
      authToken
    };

    return this.http.post<Tile[]>(url, data);
  }

  private mapToTranslatedTiles([tiles, currentLanguage]: [Tile[], string]): TranslatedTile[] {
    return tiles.map(tile => {
      // On recherche le contenu de la tuile en fonction de la langue choisie par l'utilisateur
      // Si le contenu traduit n'est pas trouvé dans la langue souhaitée, on prend le contenu dans la langue par défaut
      // Si, ni la langue courante, ni la langue par défaut n'ont été trouvées, on prend la première traduction disponible
      const translation =
        /* eslint-disable @typescript-eslint/naming-convention */
        tile.translations.find((t) => t.languages_code === currentLanguage) ||
        tile.translations.find((t) => t.languages_code === this.environment.defaultLanguage) ||
        tile.translations[0];
      /* eslint-enable @typescript-eslint/naming-convention */
      return {
        ...tile,
        title: translation.title,
        content: translation.content,
        searchKeywords: translation.searchKeywords
      };
    });
  }

}
