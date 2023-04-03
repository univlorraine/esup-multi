import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Browser } from '@capacitor/browser';
import { SocialNetwork, socialNetworks$ } from '../../social-network.repository';
import { Network } from '@capacitor/network';
import { first } from 'rxjs/operators';
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
  ) { }

  async ngOnInit() {
    if (!(await Network.getStatus()).connected) {
      return;
    }
    this.socialNetworkService.loadAndStoreSocialNetworks()
      .pipe(first()).subscribe();
  }

  async openExternalLink(link: string) {
    await Browser.open({ url: link });
  }

}
