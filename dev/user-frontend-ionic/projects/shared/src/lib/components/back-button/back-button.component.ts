import { Component, Input } from '@angular/core';
import { NavigationService } from '../../navigation/navigation.service';

@Component({
  selector: 'app-back-button',
  templateUrl: 'back-button.component.html',
  styleUrls: ['back-button.component.scss']
})
export class BackButtonComponent {

  @Input() defaultHref = '';

  constructor(
    private navigationService: NavigationService,
  ) {}

  goBack() {
    // use defaultHref if not empty
    if(this.defaultHref !== '') {
      return;
    }

    // use navigation service if defaultHref is empty
    this.navigationService.navigateBack();
  }
}
