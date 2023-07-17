import { Component, OnInit } from '@angular/core';
import { NetworkService } from '@ul/shared';
import { Observable } from 'rxjs';
import { take } from 'rxjs/operators';
import { ContactUsRepository, TranslatedContactUsPageContent } from '../../contact-us.repository';
import { ContactUsService } from '../../contact-us.service';

@Component({
  selector: 'app-contact-us-menu-item-widget',
  templateUrl: './contact-us-menu-item.component.html',
  styleUrls: ['./contact-us-menu-item.component.scss'],
})
export class ContactUsMenuItemComponent implements OnInit {

  public translatedPageContent$: Observable<TranslatedContactUsPageContent>;

  constructor(
    private contactUsService: ContactUsService,
    private contactUsRepository: ContactUsRepository,
    private networkService: NetworkService,
  ) {
    this.translatedPageContent$ = this.contactUsRepository.translatedPageContent$;
   }

  async ngOnInit(): Promise<void> {
    if (!(await this.networkService.getConnectionStatus()).connected) {
      return;
    }

    this.contactUsService.loadAndStoreContactUsPageContent()
      .pipe(take(1))
      .subscribe();
  }

}
