import { Component } from '@angular/core';
import { menuItems$ } from '@ul/shared';
@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {

  public menuItems$ = menuItems$;

  constructor() {}
}
