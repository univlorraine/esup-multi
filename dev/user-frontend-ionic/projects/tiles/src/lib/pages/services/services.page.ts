import { Component } from '@angular/core';
import { TranslatedTile, TilesService, MenuService, MenuItem } from '@ul/shared';
import { BehaviorSubject, combineLatest, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-services',
  templateUrl: './services.page.html',
  styleUrls: ['./services.page.scss'],
})
export class ServicesPage {
  public tilesIsEmpty$: Observable<boolean>;
  public menuItems$: Observable<MenuItem[]>;
  public searchQuery$: BehaviorSubject<string> = new BehaviorSubject('');

  constructor(
    private tilesService: TilesService,
    private menuService: MenuService,
  ) {
    const translatedServices$ = this.tilesService.translatedTiles$.pipe(
      map(tiles => tiles.filter(tile => !tile.widget && tile.menu === 'service'))
    );
    this.tilesIsEmpty$ = translatedServices$.pipe(map(tiles => tiles.length === 0));
    this.menuItems$ = combineLatest([translatedServices$, this.searchQuery$])
      .pipe(
        // convert into translated tiles
        map(([tiles, searchQuery]) =>
          tiles.filter(tile => (
            tile.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
            tile.content?.toLowerCase().includes(searchQuery.toLowerCase()) ||
            tile.searchKeywords?.some((keyWord) => keyWord.toLowerCase().includes(searchQuery.toLowerCase()))
          ))
        ),
        // convert into menu items
        map(translatedTiles => translatedTiles.map(translatedTile => this.menuService.convertTranslatedTile(translatedTile)))
    );
  }

  handleChange(event) {
    this.searchQuery$.next(event.target.value);
  }
}
