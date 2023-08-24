import { Component, Input, OnInit, OnDestroy } from '@angular/core';
import { ScreenService } from '../screen.service';
import { App } from '@capacitor/app';
import { PluginListenerHandle } from '@capacitor/core';

@Component({
  selector: 'app-card-modal',
  templateUrl: './card-modal.component.html',
  styleUrls: ['./card-modal.component.scss']
})

export class CardModalComponent implements OnInit, OnDestroy {
  @Input() userAndCardsData;
  public cardType: string;
  public isModalOpen = false;
  private backButtonListener: Promise<PluginListenerHandle>;

  constructor(
    private screenService: ScreenService,
  ) {}

  ngOnInit() {
    this.backButtonListener = App.addListener('backButton', this.closeModal);
  }

  ngOnDestroy() {
    this.backButtonListener.then((listener) => {
      listener.remove();
    });
  }

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
