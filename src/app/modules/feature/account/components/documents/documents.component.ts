import {Component, Input, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {DriverService} from "../../../../shared/services/driver.service";
import {HttpClient, HttpErrorResponse} from "@angular/common/http";
import {MatDialog} from "@angular/material/dialog";
import {ImagePreviewComponent} from "../../../../shared/components/image-preview/image-preview.component";
import {MatSnackBar} from "@angular/material/snack-bar";
import {DocumentInfo} from "../../../../shared/models/DocumentInfo";
import {ActivatedRoute} from "@angular/router";

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

  driverDocument:DocumentInfo={} as DocumentInfo;
  vehicleDocument:DocumentInfo={} as DocumentInfo;
  driverLicence="No file";
  vehicleLicence="No file";
  driverLicenceMessage="No driver license found";
  vehicleIdentificationMessage="No vehicle identification found";

  constructor(private _snackBar: MatSnackBar,private _route: ActivatedRoute, public dialog: MatDialog,private http: HttpClient,
              private driverService:DriverService){
    this.documentsForm = new FormGroup({
      driverLicence: new FormControl('', [Validators.required]),
      vehicleIdentification: new FormControl('', [Validators.required]),
    });
    this.documentsForm.disable();
    this.editEnabled = false;

  }

  ngOnInit() {
    this._route.params.subscribe(params => {
      this.userId = Number.parseInt(params['userId'])
    })
    this.loadDocumentsData();
  }

  loadDocumentsData(){
    this.driverService.getDocuments(this.userId).subscribe({
      next:(documents)=>{
        if (documents.length == 1) {
          if (documents[0].documentType == "DRIVING_LICENCE") {
            this.driverLicence = documents[0].name;
            this.driverLicenceMessage = "Click image for preview";
            this.vehicleIdentificationMessage = "No vehicle identification found";
            this.driverDocument=documents[0];
            this.vehicleDocument= {} as DocumentInfo;
          }
          else {
            this.vehicleLicence = documents[0].name;
            this.driverLicenceMessage = "No driver licence found";
            this.vehicleIdentificationMessage = "Click image for preview";
            this.vehicleDocument=documents[0];
            this.vehicleDocument= {} as DocumentInfo;
          }
        }
        else if (documents.length == 2){
          this.driverLicenceMessage = "Click image for preview"
          this.vehicleIdentificationMessage = "Click image for preview"
          if (documents[0].documentType == "DRIVING_LICENCE") {
            this.driverLicence = documents[0].name;
            this.vehicleLicence = documents[1].name;
            this.driverDocument=documents[0];
            this.vehicleDocument=documents[1];
          }
          else{
            this.driverLicence = documents[1].name;
            this.vehicleLicence = documents[0].name;
            this.driverDocument=documents[1];
            this.vehicleDocument=documents[0];
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
      if(this.uploadedImageDriver!=null)
        driverFormData.append('image', this.uploadedImageDriver, this.uploadedImageDriver.name);
      this.driverService.createDocument(this.userId,driverFormData,"DRIVING_LICENCE").subscribe(
        {next:(result)=>{
          if (this.driverDocument!=undefined)
          {
            if (this.driverDocument.id!=undefined) {
              this.driverService.deleteDocuments(this.driverDocument.id).subscribe({
                next: () => {
                  this.driverLicence = result.name;
                  this.uploadedImageDriver = undefined;
                  this._snackBar.open("Driver licence added successfully", "OK");
                  this.driverDocument=result;
                  this.loadDocumentsData();

                }
              })
            }
            else {
              this.driverLicence=result.name;
              this.uploadedImageDriver = undefined;
              this._snackBar.open("Driver licence added successfully","OK");
              this.loadDocumentsData();
              this.driverDocument=result;
            }
          }else {
            this.driverLicence=result.name;
            this.uploadedImageDriver = undefined;
            this._snackBar.open("Driver licence added successfully","OK");
            this.loadDocumentsData();
            this.driverDocument=result;
          }
        }})
    }
    if(this.uploadedImageVehicle!=undefined){
      const vehicleFormData = new FormData();
      if(this.uploadedImageVehicle!= null)
        vehicleFormData.append('image', this.uploadedImageVehicle, this.uploadedImageVehicle.name);

      this.driverService.createDocument(this.userId,vehicleFormData,"VEHICLE_REGISTRATION").subscribe(
        {next:(result)=>{
          if (this.vehicleDocument!=undefined) {
            if (this.vehicleDocument.id!=undefined) {
              this.driverService.deleteDocuments(this.vehicleDocument.id).subscribe({
                next: () => {
                  this.vehicleLicence = result.name;
                  this.uploadedImageVehicle = undefined;
                  this._snackBar.open("Vehicle identification added successfully", "OK");
                  this.vehicleDocument=result;
                  this.loadDocumentsData();
                }
              })
            }
            else {
              this.vehicleLicence = result.name;
              this.uploadedImageVehicle = undefined;
              this._snackBar.open("Vehicle identification added successfully", "OK");
              this.loadDocumentsData();
              this.vehicleDocument=result;
            }
          }
          else {
            this.vehicleLicence = result.name;
            this.uploadedImageVehicle = undefined;
            this._snackBar.open("Vehicle identification added successfully", "OK");
            this.loadDocumentsData();
            this.vehicleDocument=result;
          }
        }})
    }
  }
  public onImageUploadDriver(event:Event) {
    const files=(event.target as HTMLInputElement).files;
    if(files!=null)
      this.uploadedImageDriver=files[0];
  }
  public onImageUploadVehicle(event:Event) {
    const files=(event.target as HTMLInputElement).files;
    if(files!=null)
      this.uploadedImageVehicle=files[0];
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
