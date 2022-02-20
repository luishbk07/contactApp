import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators  } from '@angular/forms';
import { ContactServiceService } from 'src/app/services/contact-service.service';
import { LocalStorageServiceService } from 'src/app/services/local-storage-service.service';

@Component({
  selector: 'app-contact-form',
  templateUrl: './contact-form.component.html',
  styleUrls: ['./contact-form.component.scss']
})
export class ContactFormComponent implements OnInit {
  
  @Input('contactForm')
  public contactForm: FormGroup = new FormGroup({});
  @Input('randomId')
  randomId: number = 0;
  @Input('name')
  name: string = '';
  @Input('lastName')
  lastName: string = '';
  @Input('_phones')
  _phones: FormArray = new FormArray([]);

  @Output()
  submit = new EventEmitter();
  @Output()
  removePhone = new EventEmitter<number>();
  @Output()
  addPhone = new EventEmitter();

  constructor(
    private formBuilder: FormBuilder, 
    private contactService: ContactServiceService,
    private locasStorageService: LocalStorageServiceService) {
  

      this.addPhone.emit();

}

  ngOnInit(): void {
  }

  onSubmit() {
    this.submit.emit();
  }
  onRemovePhone(i: number) {
    this.removePhone.emit(i);
  }
  onAddPhone(i: number) {
    this.addPhone.emit(i);
  }

}
