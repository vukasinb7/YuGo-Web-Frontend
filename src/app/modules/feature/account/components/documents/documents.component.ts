import {Component, Input, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {DocumentService} from "../../services/document.service";
import {DriverService} from "../../../../shared/services/driver.service";
import {AuthService} from "../../../../core/services/auth.service";
import {HttpClient, HttpErrorResponse} from "@angular/common/http";
import {MatDialog} from "@angular/material/dialog";
import {ImagePreviewComponent} from "../../../../shared/components/image-preview/image-preview.component";
import {MatSnackBar} from "@angular/material/snack-bar";

@Component({
  selector: 'app-documents',
  templateUrl: './documents.component.html',
  styleUrls: ['./documents.component.css']
})
export class DocumentsComponent implements OnInit{
  public documentsForm : FormGroup;
  public editEnabled: boolean;
  @Input()
  public userId=-1;

  uploadedImageDriver: File | undefined;
  uploadedImageVehicle: File | undefined;
  image: any;
  driverLicence: string="No file";
  vehicleLicence: string="No file";
  driverLicenceMessage: string="No driver license found";
  vehicleIdentificationMessage: string="No vehicle identification found";

  constructor(private _snackBar: MatSnackBar, public dialog: MatDialog,private http: HttpClient,
              private _documentService : DocumentService, private driverService:DriverService){
    this.documentsForm = new FormGroup({
      driverLicence: new FormControl('', [Validators.required]),
      vehicleIdentification: new FormControl('', [Validators.required]),
    });
    this.documentsForm.disable();
    this.editEnabled = false
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
            this.driverLicenceMessage = "Click image for preview"
            this.vehicleIdentificationMessage = "No vehicle identification found"
          }
          else {
            this.vehicleLicence = documents[0].name;
            this.driverLicenceMessage = "No driver licence found"
            this.vehicleIdentificationMessage = "Click image for preview"
          }
        }
        else if (documents.length == 2){
          this.driverLicenceMessage = "Click image for preview"
          this.vehicleIdentificationMessage = "Click image for preview"
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
          this.driverLicenceMessage = "No driver licence found"
          this.vehicleIdentificationMessage = "No vehicle identification found"
        }},
      error: (error) =>{
        if (error instanceof HttpErrorResponse) {
          this.driverLicenceMessage = "No driver licence found"
          this.vehicleIdentificationMessage = "No vehicle identification found"
        }
      }});
  }

  enableEdit() : void{
    this.editEnabled = true;
  }

  cancelEdit() : void{
    this.editEnabled = false;
    this.uploadedImageDriver = undefined;
    this.uploadedImageVehicle = undefined;
  }

  submitEdit() : void {
    this.editEnabled = false;
    if (this.uploadedImageDriver!=undefined){
      const driverFormData = new FormData();
      driverFormData.append('image', this.uploadedImageDriver!, this.uploadedImageDriver!.name);
      this.driverService.createDocument(this.userId,driverFormData,"DRIVING_LICENCE").subscribe(
        {next:(result)=>{
          this.driverLicence=result.name;
          this.uploadedImageDriver = undefined;
          this._snackBar.open("Driver licence added successfully","OK");
          this.loadDocumentsData();
        }})
    }
    if(this.uploadedImageVehicle!=undefined){
      const vehicleFormData = new FormData();
      vehicleFormData.append('image', this.uploadedImageVehicle!, this.uploadedImageVehicle!.name);

      this.driverService.createDocument(this.userId,vehicleFormData,"VEHICLE_REGISTRATION").subscribe(
        {next:(result)=>{
          this.vehicleLicence=result.name;
          this.uploadedImageVehicle = undefined;
          this._snackBar.open("Vehicle identification added successfully","OK");
          this.loadDocumentsData();
        }})
    }
  }
  public onImageUploadDriver(event:Event) {
    // @ts-ignore
    this.uploadedImageDriver = event.target.files[0];
  }
  public onImageUploadVehicle(event:Event) {
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
