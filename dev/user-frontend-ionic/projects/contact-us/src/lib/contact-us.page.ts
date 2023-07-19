import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ToastController } from '@ionic/angular';
import { TranslateService } from '@ngx-translate/core';
import { authenticatedUser$, NetworkService } from '@ul/shared';
import { Observable } from 'rxjs';
import { filter, finalize, take } from 'rxjs/operators';
import { ContactUsRepository, TranslatedContactUsPageContent } from './contact-us.repository';
import { ContactMessageQueryDto, ContactUsService } from './contact-us.service';

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
    private networkService: NetworkService,
  ) {
    this.translatedPageContent$ = this.contactUsRepository.translatedPageContent$;
  }

  ngOnInit(): void {
    this.loadContentIfNetworkAvailable();

    authenticatedUser$
      .pipe(
        filter(au => au !== null),
        take(1),
      )
      .subscribe(authenticatedUser => {
        this.defaultFrom = authenticatedUser.email;
        this.contactForm.get('from').setValue(this.defaultFrom);
      });
  }


  public async loadContentIfNetworkAvailable(): Promise<void> {
    if (!(await this.networkService.getConnectionStatus()).connected) {
      return;
    }

    this.contactUsService.loadAndStoreContactUsPageContent()
      .pipe(take(1))
      .subscribe();
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
      take(1),
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
