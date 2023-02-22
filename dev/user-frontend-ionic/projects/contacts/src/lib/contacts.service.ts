import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { getAuthToken } from '@ul/shared';
import { Observable } from 'rxjs';
import { filter, first, switchMap } from 'rxjs/operators';
import { Contacts, EmailType, PhoneType } from '@capacitor-community/contacts';

export interface Contact {
  name: string;
  firstname: string;
  phoneNumbers: string[];
  mobileNumbers: string[];
  mailAdresses: string[];
  assignments: string[];
}

export interface ContactsBody {
  type: string;
  value: string;
  authToken?: string;
}

@Injectable({
  providedIn: 'root'
})
export class ContactsService {

  constructor(
    @Inject('environment')
    private environment: any,
    private http: HttpClient,) { }

  public getContacts(body: ContactsBody): Observable<Contact[]> {
    return getAuthToken().pipe(
      first(),
      filter(authToken => authToken != null),
      switchMap(authToken => this.fetchContacts(body, authToken)),
    );
  }
  public async contactAlreadyExists(user: Contact): Promise<boolean> {
    const list = await Contacts.getContacts({projection: {emails: true}});
    const contactContainsUserEmail = contact => contact.emails.find(e => user.mailAdresses.includes(e.address)) !== undefined;
    const existingContact = list.contacts.find(contactContainsUserEmail);
    return existingContact !== undefined;
  }

  public async createContact(user: Contact) {
    const phones = [];
    const emails = [];
      user.phoneNumbers.map(phone => (
        phones.push({
          type: PhoneType.Work,
          // eslint-disable-next-line id-blacklist
          number: phone,
        })
      ));
      user.mailAdresses.map(email => (
        emails.push({
          type: EmailType.Work,
          address: email,
        })
      ));
      await Contacts.createContact({
        contact: {
          name: { given: user.firstname, family: user.name },
          phones,
          emails,
        },
      });
  }

  private fetchContacts(body: ContactsBody, authToken: string): Observable<Contact[]>  {
    body.authToken = authToken;
    return this.http.post<Contact[]>(`${this.environment.apiEndpoint}/contacts`, body);
  }

}
