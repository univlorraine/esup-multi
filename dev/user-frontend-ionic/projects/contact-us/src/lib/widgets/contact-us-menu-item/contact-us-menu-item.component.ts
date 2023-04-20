import { Component, OnInit } from '@angular/core';
import { ContactUsService } from '../../contact-us.service';
import { first } from 'rxjs/operators';
import { ContactUsRepository, TranslatedContactUsPageContent } from '../../contact-us.repository';
import { Observable } from 'rxjs';

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
  ) {
    this.translatedPageContent$ = this.contactUsRepository.translatedPageContent$;
   }

  ngOnInit(): void {
    this.contactUsService.loadAndStoreContactUsPageContent()
      .pipe(first())
      .subscribe();
  }

}
