import { Component, Input } from '@angular/core';
import { IonButton, IonIcon } from '@ionic/angular';
import { TranslatePipe } from '@ngx-translate/core';
import { CustomIconComponent } from '@multi/shared';
import { MfaFactor } from '../mfa.config';

@Component({
  selector: 'app-mfa-factor',
  templateUrl: './mfa-factor.component.html',
  styleUrls: ['../../../../../src/theme/app-theme/styles/mfa/mfa-factor.component.scss'],
  imports: [CustomIconComponent, TranslatePipe, IonButton, IonIcon],
})
export class MfaFactorComponent {
  @Input({ required: true }) factor!: MfaFactor;
  @Input({ required: false }) disabled = false;
  @Input({ required: false }) showMenu = false;
}
