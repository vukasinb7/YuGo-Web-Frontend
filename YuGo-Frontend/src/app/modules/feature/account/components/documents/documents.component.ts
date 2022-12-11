import { Component } from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'app-documents',
  templateUrl: './documents.component.html',
  styleUrls: ['./documents.component.css']
})
export class DocumentsComponent {
  documentsForm = new FormGroup({
    driverLicence: new FormControl('', [Validators.required]),
    vehicleIdentification: new FormControl('', [Validators.required]),
  });
}
