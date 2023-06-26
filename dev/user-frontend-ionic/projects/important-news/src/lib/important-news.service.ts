import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { getAuthToken, NetworkService } from '@ul/shared';
import { from, Observable } from 'rxjs';
import { filter, first, switchMap } from 'rxjs/operators';
import { ImportantNews, TranslatedImportantNews } from './important-news.repository';

@Injectable({
  providedIn: 'root'
})
export class ImportantNewsService {

  constructor(
    @Inject('environment')
    private environment: any,
    private http: HttpClient,
    private networkService: NetworkService,
  ) {
  }

  public loadImportantNewsList(): Observable<ImportantNews[]> {
    return from(this.networkService.getConnectionStatus()).pipe(
      filter(status => status.connected),
      switchMap(() => getAuthToken()),
      first(),
      switchMap(authToken => this.getImportantNews(authToken))
    );
  }

  public mapToTranslatedImportantNews([importantNewsList, currentLanguage]: [ImportantNews[], string]): TranslatedImportantNews[] {
    return importantNewsList.map(importantNews => {
      // On recherche le contenu de importantNews en fonction de la langue choisie par l'utilisateur
      // Si le contenu traduit n'est pas trouvé dans la langue souhaitée, on prend le contenu dans la langue par défaut
      // Si, ni la langue courante, ni la langue par défaut n'ont été trouvées, on prend la première traduction disponible
      const translation =
        /* eslint-disable @typescript-eslint/naming-convention */
        importantNews.translations.find((t) => t.languages_code === currentLanguage) ||
        importantNews.translations.find((t) => t.languages_code === this.environment.defaultLanguage) ||
        importantNews.translations[0];
      /* eslint-enable @typescript-eslint/naming-convention */

      return {
        ...importantNews,
        title: translation.title,
        content: translation.content,
        buttonLabel: translation.buttonLabel
      };
    });
  }

  private getImportantNews(authToken: string): Observable<ImportantNews[]> {
    const url = `${this.environment.apiEndpoint}/important-news`;
    const data = {
      authToken
    };
    return this.http.post<ImportantNews[]>(url, data);
  }
}
