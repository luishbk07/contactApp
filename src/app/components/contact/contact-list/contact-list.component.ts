import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Contact } from 'src/app/interfaces/contact';
import { ContactServiceService } from 'src/app/services/contact-service.service';


@Component({
  selector: 'app-contact-list',
  templateUrl: './contact-list.component.html',
  styleUrls: ['./contact-list.component.scss']
})
export class ContactListComponent implements OnInit {

  @Input('contactList')
  contactList: Contact[];
  @Output()
  editContact = new EventEmitter<number>();
  @Output()
  restoreContact = new EventEmitter<number>();

  constructor(private contactService: ContactServiceService) {
    this.contactList = contactService.contacts;
    console.log(this.contactList);
   }

  ngOnInit(): void {
  }

  onEditContact(i: number){
    this.editContact.emit(i);
  }

  onRestoreContact(i: number){
    this.restoreContact.emit(i);
  }

}
