import { Injectable } from '@angular/core';
import { Contact } from '../interfaces/contact';
import { FormGroup } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class ContactServiceService {

  contact: Contact[] = [
    {
      id: 123,
      name: 'Luis',
      lastName: 'Henriquez',
      phones: [
        {
          phoneNumber: '(809) 758-2190'
        }
      ]
    },
    {
      id: 456,
      name: 'Luis2',
      lastName: 'Henriquez2',
      phones: [
        {
          phoneNumber: '(829) 758-2190'
        }
      ]
    },
    {
      id: 789,
      name: 'Luis',
      lastName: 'Henriquez',
      phones: [
        {
          phoneNumber: '(849) 758-2190'
        },
        {
          phoneNumber: '(809) 999-9999'
        }
      ]
    }
  ]

  constructor() { }

  get contacts(): Contact[] {
    return this.contact;
  }

  addContact(contactList: Contact[], contactForm: FormGroup){
    console.log(contactList)
    console.log(contactForm.value)
    contactList.push(contactForm.value);
  }

  updateContact(id: number, contactList: Contact[], contactForm: FormGroup){
    contactList.map(data => {
      if(data.id == id){
        data.name = contactForm.controls['name'].value;
        data.lastName = contactForm.controls['lastName'].value;
        data.phones = contactForm.controls['phones'].value;
      }
      
      return data;
    });    
  }

  

}
