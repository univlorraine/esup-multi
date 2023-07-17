import { Component, Inject, Injector } from '@angular/core';
import { Capacitor } from '@capacitor/core';
import { ActionSheetController, AlertController, ToastController } from '@ionic/angular';
import { TranslateService } from '@ngx-translate/core';
import { finalize, take } from 'rxjs/operators';
import { ContactsModuleConfig, CONTACTS_CONFIG } from './contacts.config';
import { Contact, ContactsBody, ContactsService } from './contacts.service';

@Component({
  selector: 'app-contacts',
  templateUrl: './contacts.page.html',
  styleUrls: ['./contacts.page.scss'],
})

export class ContactsComponent {

  public contacts: Contact[] = [];
  public loading = false;
  public filterChecked: string;
  public filtersList: string[];
  public searchBarText = '';
  public searchButtonPressed = false;
  private translateService: TranslateService;

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
      this.contacts = contacts;
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
}
