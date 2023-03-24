import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { BehaviorSubject, Observable, combineLatest } from 'rxjs';
import { Tile, TileType, tiles$, TileMenuType, setTiles } from './tiles.repository';
import { first, map, share, switchMap, tap } from 'rxjs/operators';
import { currentLanguage$ } from '../i18n/i18n.repository';
import { Authorization } from '../authorization/authorization.helper';
import { getAuthToken } from '../auth/auth.repository';

interface AbstractTranslatedTile {
  id: string;
  type: TileType;
  widget: string;
  title: string;
  content?: string;
  authorization?: Authorization;
  searchKeywords?: string[];
  menu: TileMenuType;
  icon: string;
}

export interface TranslatedApp extends AbstractTranslatedTile {
  routerLink: string;
  type: TileType.app;
}

export interface TranslatedInfo extends AbstractTranslatedTile {
  link?: string;
  ssoService?: string;
  type: TileType.info;
}

export type TranslatedTile = TranslatedInfo | TranslatedApp;
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
  ) {
    this.translatedTiles$ = this.translatedTilesSubject$;

    combineLatest([tiles$, currentLanguage$])
      .pipe(
        map(tilesAndCurrentLang => this.mapToTranslatedTiles(tilesAndCurrentLang)),
        share(),
    ).subscribe(this.translatedTilesSubject$);
  }

  loadAndStoreTiles(): Observable<void> {
    return getAuthToken().pipe(
      first(),
      switchMap((authToken) => this.getTiles(authToken)),
      tap(infoList => setTiles(infoList)),
      map(() => null)
    );
  }

  private getTiles(authToken: string): Observable<Tile[]> {
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
