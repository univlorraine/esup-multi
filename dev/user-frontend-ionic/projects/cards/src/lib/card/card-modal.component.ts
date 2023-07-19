import { Component, Input, OnInit } from '@angular/core';
import { ScreenService } from '../screen.service';
import { App } from '@capacitor/app';
import { PluginListenerHandle } from '@capacitor/core';

@Component({
  selector: 'app-card-modal',
  templateUrl: './card-modal.component.html',
  styleUrls: ['./card-modal.component.scss']
})

export class CardModalComponent {
  @Input() userAndCardsData;
  public cardType: string;
  public isModalOpen = false;

  constructor(
    private screenService: ScreenService,
  ) {}

  openModal(cardType) {
    this.screenService.fullBrightness();
    this.cardType = cardType;
    this.isModalOpen = true;
  }

  closeModal = () => {
    this.screenService.restorePreviousBrightness();
    this.isModalOpen = false;
  };
}

