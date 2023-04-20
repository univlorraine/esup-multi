import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { ContactUsRepository, TranslatedContactUsPageContent } from './contact-us.repository';
import { ContactMessageQueryDto, ContactUsService } from './contact-us.service';
import { filter, finalize, first } from 'rxjs/operators';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ToastController } from '@ionic/angular';
import { TranslateService } from '@ngx-translate/core';
import { authenticatedUser$ } from '@ul/shared';

@Component({
  selector: 'app-contact-us',
  templateUrl: './contact-us.page.html',
  styleUrls: ['./contact-us.page.scss'],
})
export class ContactUsPage implements OnInit {

  contactForm = new FormGroup({
    from: new FormControl('', [Validators.required, Validators.email]),
    subject: new FormControl('', Validators.required),
    text: new FormControl('', Validators.required),
  });

  isLoading = false;
  translatedPageContent$: Observable<TranslatedContactUsPageContent>;

  private defaultFrom = '';

  constructor(
    private contactUsService: ContactUsService,
    private contactUsRepository: ContactUsRepository,
    private toastController: ToastController,
    private translateService: TranslateService,
  ) {
    this.translatedPageContent$ = this.contactUsRepository.translatedPageContent$;
   }

  ngOnInit(): void {
    this.contactUsService.loadAndStoreContactUsPageContent()
      .pipe(first())
      .subscribe();

    authenticatedUser$
      .pipe(
        filter(au => au !== null),
        first(),
      )
      .subscribe(authenticatedUser => {
        this.defaultFrom = authenticatedUser.email;
        this.contactForm.get('from').setValue(this.defaultFrom);
      });
  }

  onSubmit(): void {
    this.isLoading = true;
    const query: ContactMessageQueryDto = {
      from: '',
      subject: '',
      text: '',
      ...this.contactForm.value
    };
    this.contactForm.disable();
    this.contactUsService.sendContactMessage(query).pipe(
      first(),
      finalize(() => {
        this.contactForm.enable();
        this.isLoading = false;
      })
    ).subscribe(() => {
      this.contactForm.reset({
        from: this.defaultFrom
      });
      this.showSubmitSuccessToast();
    });
  }

  private async showSubmitSuccessToast() {
    const message = this.translateService.instant('CONTACT-US.SEND_SUCCESS');
    const toast = await this.toastController.create({
      message,
      color: 'success',
      duration: 3000,
    });

    await toast.present();
  }

}
