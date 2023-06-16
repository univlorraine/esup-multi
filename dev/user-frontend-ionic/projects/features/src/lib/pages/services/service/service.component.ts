import { Component, Input } from '@angular/core';
import { isDarkTheme$, MenuOpenerService, ServiceMenuItem, updateFeatureIsNewToFalse } from '@ul/shared';

@Component({
  selector: 'app-service',
  templateUrl: './service.component.html',
  styleUrls: ['./service.component.scss'],
})
export class ServiceComponent {
  @Input() menuItem: ServiceMenuItem;
  @Input() draggableIsOn: boolean;
  public isDarkTheme$ = isDarkTheme$;

  constructor(
    public menuOpenerService: MenuOpenerService
  ) {}

  open(menuItem: ServiceMenuItem) {
    updateFeatureIsNewToFalse(menuItem);
    this.menuOpenerService.open(menuItem);
  }
}
