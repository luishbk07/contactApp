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
          phoneNumber: '(809) 999-9999'
        }
      ]
    },
    {
      id: 456,
      name: 'Pedro',
      lastName: 'Perez',
      phones: [
        {
          phoneNumber: '(829) 111-1111'
        }
      ]
    },
    {
      id: 789,
      name: 'Marta',
      lastName: 'Ramos',
      phones: [
        {
          phoneNumber: '(849) 222-2222'
        },
        {
          phoneNumber: '(809) 333-3333'
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
