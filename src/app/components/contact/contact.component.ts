import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Contact } from 'src/app/interfaces/contact';
import { ContactServiceService } from '../../services/contact-service.service';
import { LocalStorageServiceService } from '../../services/local-storage-service.service';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss']
})
export class ContactComponent implements OnInit {

  

  public contactList: Contact[];

  public randomId: number = 0;

  public isEditing: boolean = false;

  public contactForm: FormGroup = new FormGroup( {
    id: new FormControl(''),
    name: new FormControl('', Validators.required),
    lastName: new FormControl('', Validators.required),
    phones: this.formBuilder.array( [], Validators.required )
  } );

  constructor(
    private contactService: ContactServiceService,
    private formBuilder: FormBuilder,
    private locasStorageService: LocalStorageServiceService){
    this.contactList = contactService.contacts;
    console.log(this.contactList);
    this.onHandleAddPhone();
  }

  ngOnInit() { }

  ngAfterContentInit(): void {
    this.setRandomId();
  }

  setRandomId(): number {
    this.randomId = Math.floor(Math.random() * (100 - 0 + 1)) + 0;;
    return this.randomId;
  }

  get _phones(): FormArray {
    return this.contactForm.controls["phones"] as FormArray
  }
  get names(): string {
    return this.contactForm.controls["name"].value;
  }
  get lastNames(): string {
    return this.contactForm.controls["lastName"].value
  }

  get contacts(): FormGroup {
    return this.contactForm;
  }

  newPhone(): FormArray {
    return this.formBuilder.array(this._phones.controls);
  }

  onHandleAddPhone() {
    const phoneForm = this.formBuilder.group( {
      phoneNumber: ['', Validators.required]
    } );
    this._phones.push(phoneForm);
    console.log(this._phones.length);
  }

  onHandleRemovePhone( i: number ){
    this._phones.removeAt( i );
  }

  addContact() {
    console.log(this.contactForm.controls["name"])
    this.contactService.addContact(this.contactList, this.contactForm);    
  }

  onHandleEditContact( i: number ) { 
    this.recalculatePhoneInputsOnEditing(i);   
    this.contactForm.setValue(this.contactList[i]);
    this.locasStorageService.saveContact(this.contactForm.value);
  }

  onHandleRestoreContact( i: number ) { 
    let contact = [];
    contact.push(this.contactList[i]);
    this.locasStorageService.restoreAsDefault(i, contact);
  }

  recalculatePhoneInputsOnEditing(i: number) {
    const limit = this.contactList[i].phones.length;
    if (this._phones.length < limit) {
      while(this._phones.length < limit){
        this.onHandleAddPhone();
      }
    } else {
      while(this._phones.length > limit){
        this.onHandleRemovePhone(i);
      }      
    }
  }

  onHandleSubmit() {
    this.validateIfExists(this.contactForm.get('id')?.value)
    setTimeout(() => {
      this.contactForm.reset();
      this.setRandomId();
    }, 1000);
  }

  validateIfExists(id: number){
    const exists = this.contactList.filter( x => x.id === id );
    if (exists.length) {
      this.contactService.updateContact(id, this.contactList, this.contactForm);
    } else {
      this.addContact();
    }
  }

}
