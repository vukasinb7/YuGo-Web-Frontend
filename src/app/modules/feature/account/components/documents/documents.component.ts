import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {DocumentService} from "../../services/document.service";
import {AuthService} from "../../../../core/services/auth.service";

@Component({
  selector: 'app-documents',
  templateUrl: './documents.component.html',
  styleUrls: ['./documents.component.css']
})
export class DocumentsComponent implements OnInit{

  public documentsForm : FormGroup;
  public editEnabled: boolean

  constructor(private _documentService : DocumentService){
    this.documentsForm = new FormGroup({
      driverLicence: new FormControl('', [Validators.required]),
      vehicleIdentification: new FormControl('', [Validators.required]),
    });
    this.documentsForm.disable();
    this.editEnabled = false;
  }

  ngOnInit() {
    this.loadDocumentsData();
  }

  loadDocumentsData(){

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
