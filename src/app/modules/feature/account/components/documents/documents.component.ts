import { Component } from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'app-documents',
  templateUrl: './documents.component.html',
  styleUrls: ['./documents.component.css']
})
export class DocumentsComponent {

  documentsForm : FormGroup;
  editEnabled: boolean

  constructor() {
    this.documentsForm = new FormGroup({
      driverLicence: new FormControl('', [Validators.required]),
      vehicleIdentification: new FormControl('', [Validators.required]),
    });
    this.documentsForm.disable();
    this.editEnabled = false;
  }

  enableEdit() : void{
    this.documentsForm.enable();
    this.editEnabled = true;
  }

  cancelEdit() : void{
    this.documentsForm.disable();
    this.editEnabled = false;
  }

  submitEdit() : void {
    this.documentsForm.disable();
    this.editEnabled = false;
  }
}
