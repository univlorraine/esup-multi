import { Component, Inject } from '@angular/core';
import { Network } from '@capacitor/network';
import { currentLanguage$, getAuthToken } from '@ul/shared';
import { combineLatest, Observable } from 'rxjs';
import { finalize, first, map, switchMap } from 'rxjs/operators';
import { setTiles, Tile, tiles$, TranslatedTile } from '../../tiles.repository';
import { TilesService } from '../../tiles.service';

@Component({
  selector: 'app-widgets',
  templateUrl: './widgets.page.html',
  styleUrls: ['./widgets.page.scss'],
})
export class WidgetsPage {
  public tiles$: Observable<Tile[]> = tiles$.pipe(map(tiles => tiles.filter(t => t.widget)));
  public tilesIsEmpty$: Observable<boolean>;
  public isLoading = false;
  public translatedTiles$: Observable<TranslatedTile[]>;

  constructor(
    private tilesService: TilesService,
  ) {
    this.tilesIsEmpty$ = this.tiles$.pipe(map(tiles => tiles.length === 0));
    this.translatedTiles$ = combineLatest([this.tiles$, currentLanguage$])
      .pipe(
        map(tilesAndCurrentLang => this.tilesService.mapToTranslatedTiles(tilesAndCurrentLang)),
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
      switchMap((authToken) =>
        this.tilesService.getTiles(authToken)
      ),
      finalize(() => this.isLoading = false)
    ).subscribe(infoList => setTiles(infoList));
  }


}
