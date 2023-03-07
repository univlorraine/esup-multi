import { Component } from '@angular/core';
import { Network } from '@capacitor/network';
import { currentLanguage$, getAuthToken } from '@ul/shared';
import { BehaviorSubject, combineLatest, Observable } from 'rxjs';
import { finalize, first, map, switchMap } from 'rxjs/operators';
import { setTiles, Tile, tiles$, TranslatedTile } from '../../tiles.repository';
import { TilesService } from '../../tiles.service';

@Component({
  selector: 'app-services',
  templateUrl: './services.page.html',
  styleUrls: ['./services.page.scss'],
})
export class ServicesPage {
  public tiles$: Observable<Tile[]> = tiles$.pipe(map(tiles => tiles.filter(t => !t.widget)));
  public tilesIsEmpty$: Observable<boolean>;
  public isLoading = false;
  public translatedTiles$: Observable<TranslatedTile[]>;
  public searchQuery$: BehaviorSubject<string> = new BehaviorSubject('');

  constructor(
    private tilesService: TilesService,
  ) {
    this.tilesIsEmpty$ = this.tiles$.pipe(map(tiles => tiles.length === 0));
    this.translatedTiles$ = combineLatest([this.tilesService.translatedTiles$, this.searchQuery$])
      .pipe(
        map(([tiles, searchQuery]) =>
          tiles.filter(tile => (
            tile.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
            tile.content?.toLowerCase().includes(searchQuery.toLowerCase()) ||
            tile.searchKeywords?.some((keyWord) => keyWord.toLowerCase().includes(searchQuery.toLowerCase()))
          ))
        )
      );
  }

  handleChange(event) {
    this.searchQuery$.next(event.target.value);
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
}
