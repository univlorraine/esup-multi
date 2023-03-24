import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { TranslatedTile, TilesService } from '@ul/shared';

@Component({
  selector: 'app-widgets',
  templateUrl: './widgets.page.html',
  styleUrls: ['./widgets.page.scss'],
})
export class WidgetsPage {
  public tilesIsEmpty$: Observable<boolean>;
  public translatedTiles$: Observable<TranslatedTile[]>;

  constructor(
    private tilesService: TilesService,
  ) {
    this.translatedTiles$ = this.tilesService.translatedTiles$.pipe(
      map(tiles => tiles.filter(t => t.widget))
    );
    this.tilesIsEmpty$ = this.translatedTiles$.pipe(map(tiles => tiles.length === 0));
  }

}
