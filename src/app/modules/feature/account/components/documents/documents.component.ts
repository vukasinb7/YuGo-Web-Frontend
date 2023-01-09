import {Component, Input, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {DocumentService} from "../../services/document.service";
import {DriverService} from "../../../../shared/services/driver.service";
import {AuthService} from "../../../../core/services/auth.service";
import {HttpClient, HttpErrorResponse} from "@angular/common/http";
import {MatDialog} from "@angular/material/dialog";
import {ImagePreviewComponent} from "../../../../shared/components/image-preview/image-preview.component";

@Component({
  selector: 'app-documents',
  templateUrl: './documents.component.html',
  styleUrls: ['./documents.component.css']
})
export class DocumentsComponent implements OnInit{
  public errorMessage: string = "";
  public documentsForm : FormGroup;
  public editEnabled: boolean;
  public driverDocumentInput:HTMLInputElement;
  public vehicleDocumentInput:HTMLInputElement;

  @Input()
  public userId=-1;

  uploadedImageDriver: File | undefined;
  uploadedImageVehicle: File | undefined;
  image: any;
  driverLicence: string="No file";
  vehicleLicence: string="No file";

  constructor(public dialog: MatDialog,private http: HttpClient,private _documentService : DocumentService,
              private driverService:DriverService){
    this.documentsForm = new FormGroup({
      driverLicence: new FormControl('', [Validators.required]),
      vehicleIdentification: new FormControl('', [Validators.required]),
    });
    this.documentsForm.disable();
    this.editEnabled = false;
    this.driverDocumentInput=document.getElementById("input-file-driving")! as HTMLInputElement;
    this.vehicleDocumentInput=document.getElementById("input-file-id-vehicle")! as HTMLInputElement;
  }

  ngOnInit() {
    this.loadDocumentsData();
  }

  loadDocumentsData(){
    this.driverService.getDocuments(this.userId).subscribe({
      next:(documents)=>{
        if (documents.length == 1) {
          if (documents[0].documentType == "DRIVING_LICENCE") {
            this.driverLicence = documents[0].name;
            this.errorMessage = "Please insert vehicle identification picture!";
          }
          else {
            this.vehicleLicence = documents[0].name;
            this.errorMessage = "Please insert driver licence picture!";
          }
        }
        else if (documents.length == 2){
          if (documents[0].documentType == "DRIVING_LICENCE") {
            this.driverLicence = documents[0].name;
            this.vehicleLicence = documents[1].name;
          }
          else{
            this.driverLicence = documents[1].name;
            this.vehicleLicence = documents[0].name;
          }
        }
        else{
          this.errorMessage = "Please insert documents pictures!";
        }},
      error: (error) =>{
        if (error instanceof HttpErrorResponse) {
          this.errorMessage = "Please insert documents pictures!";
        }
      }});
  }

  enableEdit() : void{
    this.editEnabled = true;
  }

  cancelEdit() : void{
    this.editEnabled = false;
  }

  submitEdit() : void {
    this.editEnabled = false;
    this.driverDocumentInput=document.getElementById("input-file-driving")! as HTMLInputElement;
    this.vehicleDocumentInput=document.getElementById("input-file-id-vehicle")! as HTMLInputElement;
    if (this.uploadedImageDriver!=undefined){
      const driverFormData = new FormData();
      driverFormData.append('image', this.uploadedImageDriver!, this.uploadedImageDriver!.name);
      this.driverService.createDocument(this.userId,driverFormData,"DRIVING_LICENCE").subscribe({next:(result)=>{
          this.driverLicence=result.name;
        }})
    }
    if(this.uploadedImageVehicle!=undefined){
      const vehicleFormData = new FormData();
      vehicleFormData.append('image', this.uploadedImageVehicle!, this.uploadedImageVehicle!.name);

      this.driverService.createDocument(this.userId,vehicleFormData,"VEHICLE_REGISTRATION").subscribe({next:(result)=>{
          this.vehicleLicence=result.name;
        }})
    }
  }
  public onImageUploadDriver(event:Event) {
    this.driverDocumentInput=document.getElementById("input-file-driving")! as HTMLInputElement;
    // @ts-ignore
    this.uploadedImageDriver = event.target.files[0];
  }
  public onImageUploadVehicle(event:Event) {
    this.vehicleDocumentInput=document.getElementById("input-file-id-vehicle")! as HTMLInputElement;
    // @ts-ignore
    this.uploadedImageVehicle = event.target.files[0];
  }
  openDialog(path:string) {
    if (path != "No file") {
      this.dialog.open(ImagePreviewComponent, {
        data: path,
        height: '70%',
        backdropClass: 'backdropBackground',
      })
    }
  }

}
