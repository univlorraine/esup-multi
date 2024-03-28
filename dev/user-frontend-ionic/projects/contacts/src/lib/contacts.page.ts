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

import { Component, ElementRef, Inject, Injector, ViewChild } from '@angular/core';
import { Capacitor } from '@capacitor/core';
import { ActionSheetController, AlertController, ToastController } from '@ionic/angular';
import { TranslateService } from '@ngx-translate/core';
import { finalize, take } from 'rxjs/operators';
import { ContactsModuleConfig, CONTACTS_CONFIG } from './contacts.config';
import { Contact, ContactsBody, ContactsService } from './contacts.service';

@Component({
  selector: 'app-contacts',
  templateUrl: './contacts.page.html',
  styleUrls: ['../../../../src/theme/app-theme/styles/contacts/contacts.page.scss'],
})

export class ContactsComponent {

  @ViewChild('searchBlock') viewBlock: ElementRef;
  public contacts: Contact[] = [];
  public loading = false;
  public filterChecked: string;
  public filtersList: string[];
  public searchBarText = '';
  public searchButtonPressed = false;
  public searchFixed = false;
  private lastScrollTop = 0;
  private translateService: TranslateService;
  private deltaSearchDisplay = 10; // number of pixels to scroll down/up before display the search block

  constructor(
    private contactsService: ContactsService,
    public actionSheetController: ActionSheetController,
    private alertController: AlertController,
    @Inject(CONTACTS_CONFIG) private config: ContactsModuleConfig,
    private injector: Injector,
    private toastController: ToastController,
  ) {
    this.filtersList = this.config.contactTypes;
    this.filterChecked = this.config.contactTypes[0];
    this.translateService = this.injector.get(TranslateService);
  }

  saveSearchBar(event) {
    this.searchBarText = event.detail.value;
  }

  searchContacts() {
    if (this.searchBarText === '') {
      return;
    }
    this.loading = true;
    const searchBody: ContactsBody = {
      type: this.filterChecked,
      value: this.searchBarText,
    };

    this.contactsService.getContacts(searchBody)
    .pipe(take(1), finalize(() => this.loading = false))
    .subscribe(contacts => {
      this.contacts = contacts.map(contact => ({
        ...contact,
        phoneNumbers: contact.phoneNumbers?.filter(phoneNumber => phoneNumber && phoneNumber.trim() !== ''),
        mobileNumbers: contact.mobileNumbers?.filter(mobileNumber => mobileNumber && mobileNumber.trim() !== ''),
        mailAddresses: contact.mailAddresses?.filter(mailAddresse => mailAddresse && mailAddresse.trim() !== '')
      }));
      this.searchButtonPressed = true;
    });

  }

  async createContact(user: Contact) {
    if (!Capacitor.isNativePlatform()) {
      const alert = await this.alertController.create({
        header: this.translateService.instant('CONTACTS.ALERT.ERROR.HEADER'),
        subHeader: this.translateService.instant('CONTACTS.ALERT.ERROR.SUBHEADER'),
        message: this.translateService.instant('CONTACTS.ALERT.ERROR.MESSAGE'),
        buttons: [this.translateService.instant('CONTACTS.ALERT.ERROR.BUTTON1')],
      });
      await alert.present();
      return;
    }
    if (await this.contactsService.contactAlreadyExists(user)) {
    const alreadyExist = await this.toastController.create({
      message: this.translateService.instant('CONTACTS.ALERT.ERROR.EXIST'),
      duration: 1500,
      position: 'middle',
      color: 'warning'
    });
    await alreadyExist.present();
    return;
    }
    await this.contactsService.createContact(user);
    const toast = await this.toastController.create({
      message: this.translateService.instant('CONTACTS.ALERT.SUCCESS.MESSAGE'),
      duration: 1500,
      position: 'middle',
      color: 'success'
    });
    await toast.present();
  }

  selectedCategory(item) {
   this.filterChecked = item.detail.value;
  }

  handleScroll(event: Event) {
    const scrollTop = (event as CustomEvent).detail.scrollTop;
    if (Math.abs(scrollTop - this.lastScrollTop) > this.deltaSearchDisplay) {
      this.searchFixed = scrollTop <= this.lastScrollTop && scrollTop > 0;
      this.lastScrollTop = scrollTop;
    }
  }

  getSearchBlockHeight() {
    return this.viewBlock.nativeElement.offsetHeight;
  }
}
