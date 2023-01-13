import { Component, Inject } from '@angular/core';
import { Network } from '@capacitor/network';
import { currentLanguage$, getAuthToken } from '@ul/shared';
import { finalize, first, map, switchMap } from 'rxjs/operators';
import { Observable, combineLatest} from 'rxjs';
import { Tile, tiles$, setTiles, TranslatedTile } from './tiles.repository';
import { TilesService } from './tiles.service';

@Component({
  selector: 'app-tiles',
  templateUrl: './tiles.page.html',
  styleUrls: ['./tiles.page.scss'],
})
export class TilesPage {
  public tiles$: Observable<Tile[]> = tiles$;
  public tilesIsEmpty$: Observable<boolean>;
  public isLoading = false;
  public translatedTiles$: Observable<TranslatedTile[]>;

  constructor(
    @Inject('environment')
    private environment: any,
    private tilesService: TilesService,
  ) {
    this.tilesIsEmpty$ = this.tiles$.pipe(map(tiles => tiles.length === 0));
    this.translatedTiles$ = combineLatest([this.tiles$, currentLanguage$])
      .pipe(
        map(tilesAndCurrentLang => this.mapToTranslatedTiles(tilesAndCurrentLang))
      );
  }

  ionViewWillEnter() {
    void this.loadTilesList();
  }

  private async loadTilesList(): Promise<void> {
    // skip if network is not available
    if (!(await Network.getStatus()).connected) {
      return;
    }

    this.isLoading = true;
    getAuthToken().pipe(
      first(),
      switchMap((authToken) => this.tilesService.getTiles(authToken)),
      finalize(() => this.isLoading = false)
    ).subscribe(infoList => setTiles(infoList));
  }

  private mapToTranslatedTiles([tiles, currentLanguage]: [Tile[], string]): TranslatedTile[] {
    return tiles.map(tile => {
      // On recherche le contenu de la tuile en fonction de la langue choisie par l'utilisateur
      // Si le contenu traduit n'est pas trouvé dans la langue souhaitée, on prend le contenu dans la langue par défaut
      // Si, ni la langue courante, ni la langue par défaut n'ont été trouvées, on prend la première traduction disponible
      const translation =
        tile.translations.find((t) => t.languages_code === currentLanguage) ||
        tile.translations.find((t) => t.languages_code === this.environment.defaultLanguage) ||
        tile.translations[0]
      ;

      return {
        ...tile,
        title: translation.title,
        content: translation.content
      }
    });
  }
}
