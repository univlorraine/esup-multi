import { Component, OnInit } from '@angular/core';
import { Browser } from '@capacitor/browser';
import { NetworkService } from '@ul/shared';
import { Observable } from 'rxjs';
import { first } from 'rxjs/operators';
import { SocialNetwork, socialNetworks$ } from '../../social-network.repository';
import { SocialNetworkService } from '../../social-network.service';

@Component({
  selector: 'lib-social-network',
  templateUrl: './social-network.component.html',
  styleUrls: ['./social-network.component.scss'],
})
export class SocialNetworkComponent implements OnInit {
  public socialNetworks$: Observable<SocialNetwork[]> = socialNetworks$;

  constructor(
    private socialNetworkService: SocialNetworkService,
    private networkService: NetworkService,
  ) { }

  async ngOnInit() {
    if (!(await this.networkService.getConnectionStatus()).connected) {
      return;
    }
    this.socialNetworkService.loadAndStoreSocialNetworks()
      .pipe(first()).subscribe();
  }

  async openExternalLink(link: string) {
    await Browser.open({ url: link });
  }
}
