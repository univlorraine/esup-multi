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
      const userRoles = (authenticatedUser) ? authenticatedUser.roles : ['anonymous'];
      this.tileItems = this.projectModuleService.getTiles(userRoles);
    });
  }
}
