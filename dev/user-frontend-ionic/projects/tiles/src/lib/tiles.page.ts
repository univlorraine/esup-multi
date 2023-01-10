import { Component } from '@angular/core';
import { Network } from '@capacitor/network';
import { authenticatedUser$ } from '@ul/shared';
import { finalize, filter, first, map, switchMap } from 'rxjs/operators';
import { Observable, Subscription, zip } from 'rxjs';
import { Tile, tiles$, setTiles } from './tiles.repository';
import { currentLanguage$ } from '@ul/shared';
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
  private currentLanguageSubcription: Subscription;

  constructor(
    private tilesService: TilesService,
  ) {
    this.tilesIsEmpty$ = this.tiles$.pipe(map(tiles => tiles.length === 0));
  }

  ionViewWillEnter() {
    this.currentLanguageSubcription = currentLanguage$
      .subscribe(lang => this.loadInfoList(lang));
  }

  ionViewWillLeave() {
    this.currentLanguageSubcription?.unsubscribe();
  }



  private async loadInfoList(lang: string): Promise<void> {
    // skip if network is not available
    if (!(await Network.getStatus()).connected) {
      return;
    }

    this.isLoading = true;
    zip(currentLanguage$, authenticatedUser$).pipe(
      first(),
      switchMap(([currentLanguage, authenticatedUser]) => this.tilesService.getTiles(currentLanguage, authenticatedUser?.authToken)),
      finalize(() => this.isLoading = false)
    ).subscribe(infoList => setTiles(infoList));
  }
}
