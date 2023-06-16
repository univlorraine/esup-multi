import { Component, Input } from '@angular/core';
import { isDarkTheme$ } from '../../theme/theme.repository';

@Component({
  selector: 'app-custom-icon',
  templateUrl: 'custom-icon.component.html',
  styleUrls: ['custom-icon.component.scss']
})
export class CustomIconComponent {
  @Input() icon?: string;
  @Input() iconSourceSvgLightTheme?: string;
  @Input() iconSourceSvgDarkTheme?: string;
  @Input() color?: string;
  @Input() size?: string;
  @Input() slot?: string;

  public isDarkTheme$ = isDarkTheme$;

  constructor() {}
}
