import { Component } from '@angular/core';
import { NavigationService } from '../../navigation/navigation.service';
import { Router } from '@angular/router';
import { first, map } from 'rxjs/operators';

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
    this.navigationService.navigationPath$.pipe(
      first(),
      map(navigationPath => navigationPath.previous),
    ).subscribe(previousPath => this.router.navigateByUrl(previousPath));
  }
}
