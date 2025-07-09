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

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Contacts, EmailType, PhoneType } from '@capacitor-community/contacts';
import { getAuthToken, MultiTenantService } from '@multi/shared';
import { Observable } from 'rxjs';
import { switchMap, take } from 'rxjs/operators';

export interface Contact {
  name: string;
  firstname: string;
  phoneNumbers: string[];
  mobileNumbers: string[];
  mailAddresses: string[];
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
    private multiTenantService: MultiTenantService,
    private http: HttpClient,) { }

  public getContacts(body: ContactsBody): Observable<Contact[]> {
    return getAuthToken().pipe(
      take(1),
      switchMap(authToken => this.fetchContacts(body, authToken)),
    );
  }
  public async contactAlreadyExists(user: Contact): Promise<boolean> {
    const { contacts: allContacts } = await Contacts.getContacts({projection: {emails: true}});
    return allContacts.find((contact) => contact.emails?.find((email) =>
      user.mailAddresses.includes(email.address))) !== undefined;
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
      user.mailAddresses.map(email => (
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
    body.authToken = authToken || null;
    return this.http.post<Contact[]>(`${this.multiTenantService.getApiEndpoint()}/contacts`, body);
  }

}
