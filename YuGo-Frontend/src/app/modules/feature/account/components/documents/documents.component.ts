import { Component } from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'app-documents',
  templateUrl: './documents.component.html',
  styleUrls: ['./documents.component.css']
})
export class DocumentsComponent {

  documentsForm : FormGroup;
  editDisabled : boolean;

  constructor() {
    this.documentsForm = new FormGroup({
      driverLicence: new FormControl('', [Validators.required]),
      vehicleIdentification: new FormControl('', [Validators.required]),
    });
    this.documentsForm.disable();
    this.editDisabled = true;
  }
}
