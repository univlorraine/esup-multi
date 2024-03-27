/*
 * Copyright ou © ou Copr. Université de Lorraine, (2022)
 *
 * Direction du Numérique de l'Université de Lorraine - SIED
 *  (dn-mobile-dev@univ-lorraine.fr)
 * JNESIS (contact@jnesis.com)
 *
 * Ce logiciel est un programme informatique servant à rendre accessible
 * sur mobile divers services universitaires aux étudiants et aux personnels
 * de l'université.
 *
 * Ce logiciel est régi par la licence CeCILL 2.1, soumise au droit français
 * et respectant les principes de diffusion des logiciels libres. Vous pouvez
 * utiliser, modifier et/ou redistribuer ce programme sous les conditions
 * de la licence CeCILL telle que diffusée par le CEA, le CNRS et INRIA
 * sur le site "http://cecill.info".
 *
 * En contrepartie de l'accessibilité au code source et des droits de copie,
 * de modification et de redistribution accordés par cette licence, il n'est
 * offert aux utilisateurs qu'une garantie limitée. Pour les mêmes raisons,
 * seule une responsabilité restreinte pèse sur l'auteur du programme, le
 * titulaire des droits patrimoniaux et les concédants successifs.
 *
 * À cet égard, l'attention de l'utilisateur est attirée sur les risques
 * associés au chargement, à l'utilisation, à la modification et/ou au
 * développement et à la reproduction du logiciel par l'utilisateur étant
 * donné sa spécificité de logiciel libre, qui peut le rendre complexe à
 * manipuler et qui le réserve donc à des développeurs et des professionnels
 * avertis possédant des connaissances informatiques approfondies. Les
 * utilisateurs sont donc invités à charger et à tester l'adéquation du
 * logiciel à leurs besoins dans des conditions permettant d'assurer la
 * sécurité de leurs systèmes et/ou de leurs données et, plus généralement,
 * à l'utiliser et à l'exploiter dans les mêmes conditions de sécurité.
 *
 * Le fait que vous puissiez accéder à cet en-tête signifie que vous avez
 * pris connaissance de la licence CeCILL 2.1, et que vous en avez accepté les
 * termes.
 */

import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ToastController } from '@ionic/angular';
import { TranslateService } from '@ngx-translate/core';
import { authenticatedUser$, NetworkService } from '@multi/shared';
import { Observable } from 'rxjs';
import { filter, finalize, take } from 'rxjs/operators';
import { ContactUsRepository, TranslatedContactUsPageContent } from './contact-us.repository';
import { ContactMessageQueryDto, ContactUsService } from './contact-us.service';

@Component({
  selector: 'app-contact-us',
  templateUrl: './contact-us.page.html',
  styleUrls: ['../../../../src/theme/app-theme/contact-us/contact-us.page.scss'],
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
