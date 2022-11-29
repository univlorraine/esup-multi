import { Component, OnInit } from '@angular/core';
import { authenticatedUser$, ProjectModuleService } from '@ul/shared';
import { first } from 'rxjs/operators';


@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {


  public tileItems;

  constructor(private projectModuleService: ProjectModuleService) {
  }

  ngOnInit(): void {
  }

  ionViewDidEnter() {

    authenticatedUser$.pipe(first()).subscribe(authenticatedUser => {
      const unsortedTileItems = this.projectModuleService.getTileItems();
      const sortedTileItems = [];

      for (const tileItem of unsortedTileItems) {

        if (!tileItem.roles) {
          sortedTileItems.push(tileItem);
          continue;
        }

        if (!authenticatedUser) {
          if (tileItem.roles.includes('anonymous')) {
            sortedTileItems.push(tileItem);
          }
          continue;
        }

        for (const role of authenticatedUser.roles) {
          if (tileItem.roles.includes(role)) {
            sortedTileItems.push(tileItem);
            break;
          }
        }
      }
      this.tileItems = sortedTileItems;
    });
  }
}
