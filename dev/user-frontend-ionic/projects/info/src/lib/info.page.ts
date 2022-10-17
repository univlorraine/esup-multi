import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Info, infoList$, setInfoList } from './info.repository';
import { Browser } from '@capacitor/browser';
import { InfoService } from './info.service';
import { Network } from '@capacitor/network';

@Component({
  selector: 'app-info',
  templateUrl: './info.page.html',
  styleUrls: ['./info.page.scss'],
})
export class InfoPage {

  public infoList$: Observable<Info[]> = infoList$;
  public infoListIsEmpty$: Observable<boolean>;

  constructor(
    private infoService: InfoService,
  ) {
    this.infoListIsEmpty$ = this.infoList$.pipe(map( infoList => infoList.length === 0))
  }

  async onClick(info: Info) {
    if(info.link) {
      await Browser.open({ url: info.link });
    }
  }

  ionViewWillEnter() {
    this.loadInfoList();
  }

  private async loadInfoList() {
    // skip if network is not available
    if (!(await Network.getStatus()).connected) {
      return;
    }

    this.infoService.getInfoList()
      .subscribe(infoList => setInfoList(infoList) );
  }
}
