import { Component, EventEmitter, Input, Output } from '@angular/core';
import {
  IonButton,
  IonContent,
  IonIcon,
  IonItem,
  IonLabel,
  IonList,
  IonPopover,
} from '@ionic/angular';
import { TranslatePipe } from '@ngx-translate/core';
import { CustomIconComponent } from '@multi/shared';
import { MfaFactor } from '../mfa.config';

export type MfaFactorMenuAction = 'info' | 'delete';

@Component({
  selector: 'app-mfa-factor',
  templateUrl: './mfa-factor.component.html',
  styleUrls: ['../../../../../src/theme/app-theme/styles/mfa/mfa-factor.component.scss'],
  imports: [
    CustomIconComponent,
    TranslatePipe,
    IonButton,
    IonIcon,
    IonPopover,
    IonContent,
    IonList,
    IonItem,
    IonLabel,
  ],
})
export class MfaFactorComponent {
  @Input({ required: true }) factor!: MfaFactor;
  @Input({ required: false }) disabled = false;
  @Input({ required: false }) showMenu = false;

  @Output() actionSelected = new EventEmitter<MfaFactorMenuAction>();

  protected menuOpen = false;
  protected menuEvent?: Event;

  protected openMenu(event: Event): void {
    this.menuEvent = event;
    this.menuOpen = true;
  }

  protected selectAction(action: MfaFactorMenuAction): void {
    this.menuOpen = false;
    this.actionSelected.emit(action);
  }
}
