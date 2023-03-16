import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { first, map } from 'rxjs/operators';
import { NavigationService } from '../../navigation/navigation.service';

@Component({
  selector: 'app-back-button',
  templateUrl: 'back-button.component.html',
  styleUrls: ['back-button.component.scss']
})
export class BackButtonComponent {
  constructor(
    private navigationService: NavigationService,
    private router: Router,
  ) {}

  goBack() {
    this.navigationService.navigationRouterLink$.pipe(
      first(),
      map(navigationRouterLink => navigationRouterLink.previous),
    ).subscribe(previousRouterLink => this.router.navigateByUrl(previousRouterLink));
  }
}
