import { Injectable } from '@angular/core';
import { Contact } from '../interfaces/contact';

@Injectable({
  providedIn: 'root'
})
export class LocalStorageServiceService {

  constructor() { }

  saveContact(contactList: Contact[]) {
    const contact = JSON.stringify(contactList);
    localStorage.setItem('contact', contact);
  }

  restoreAsDefault(id: number, contactList: Contact[]) {
    const contact = JSON.parse(localStorage.getItem('contact')!);
    contactList.map( data => {
      if (data.id == contact.id) {
        data.name = contact.name;
        data.lastName = contact.lastName;
        data.phones = contact.phones;
      }
      return data;
    })
  }
}
