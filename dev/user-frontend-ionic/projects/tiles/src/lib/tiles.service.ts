import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { KeepAuthService } from '@ul/shared';
import { Observable, throwError } from 'rxjs';
import { catchError, concatMap } from 'rxjs/operators';
import { Tile, TranslatedTile } from './tiles.repository';

@Injectable({
  providedIn: 'root'
})
export class TilesService {

  constructor(
    @Inject('environment')
    private environment: any,
    private http: HttpClient,
    private keepAuthService: KeepAuthService,
  ) {}

  public getTiles(authToken: string): Observable<Tile[]> {
    const url = `${this.environment.apiEndpoint}/tiles`;
    const data = {
      authToken
    };

    return this.http.post<Tile[]>(url, data);
  }

  public mapToTranslatedTiles([tiles, currentLanguage]: [Tile[], string]): TranslatedTile[] {
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

  public requestSsoServiceToken(service: string, authToken: string): Observable<string> {
    const url = `${this.environment.apiEndpoint}/sso-service-token`;
    const data = {
      authToken,
      service
    };

    return this.http.post<string>(url, data, {responseType: 'text' as 'json'}).pipe(
      catchError(err => {
        // do not handle non HTTP errors
        if (!(err instanceof HttpErrorResponse)) {
          return throwError(err);
        }

        // do not handle non 401 HTTP errors
        if (err.status !== 401) {
          return throwError(err);
        }

        // in case of error 401 user authentication is expired, we try to reauthenticate
        // (available if user has allowed saving his credentials)
        return this.keepAuthService.reauthenticateIfAvailable().pipe(
          concatMap(authenticatedUser => authenticatedUser ?
            this.http.post<string>(url, {...data, authToken: authenticatedUser.authToken}, {responseType: 'text' as 'json'}) :
            throwError(err)
          )
        );
      }));
  }
}
