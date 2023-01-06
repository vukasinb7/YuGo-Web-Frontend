import {AfterViewInit, Component, Input, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {UserService} from "../../../../shared/services/user.service";
import {AuthService} from "../../../../core/services/auth.service";
import {Vehicle} from "../../../../shared/models/Vehicle";
import {VehicleService} from "../../../../shared/services/vehicle.service";
import {HttpErrorResponse} from "@angular/common/http";
import {take} from "rxjs";

@Component({
  selector: 'app-vehicle-details',
  templateUrl: './vehicle-details.component.html',
  styleUrls: ['./vehicle-details.component.css']
})
export class VehicleDetailsComponent implements OnInit, AfterViewInit{
  @Input()
  public userId: number = -1;
  vehicleDetailsForm : FormGroup;
  editEnabled: boolean = false;
  responseMessage: string = "";
  constructor(private _vehicleService: VehicleService) {
    this.vehicleDetailsForm = new FormGroup({
      model: new FormControl('', [Validators.required]),
      vehicleType: new FormControl('', [Validators.required]),
      licenseNumber: new FormControl('', [Validators.required]),
      babyTransport: new FormControl('', [Validators.required]),
      petTransport: new FormControl('', [Validators.required]),
      passengerSeats: new FormControl('', [Validators.required]),
    });
  }

  ngOnInit(){
    this.loadVehicleData();
  }

  ngAfterViewInit() {
    this.cancelEdit();
  }

  loadVehicleData(){
    this._vehicleService.getVehicle(this.userId).pipe(take(1)).subscribe({
      next: (vehicle) => {
        this.vehicleDetailsForm.patchValue({
          model: vehicle.model,
          vehicleType: vehicle.vehicleType,
          licenseNumber: vehicle.licenseNumber,
          babyTransport: vehicle.babyTransport,
          petTransport: vehicle.petTransport,
          passengerSeats: vehicle.passengerSeats,
        })
      },
      error: (error) => {
        if (error instanceof HttpErrorResponse) {

        }
      }
    });
  }

  enableEdit() : void{
    this.vehicleDetailsForm.enable();
    this.editEnabled = true;
  }

  cancelEdit() : void{
    this.vehicleDetailsForm.disable();
    this.editEnabled = false;
  }

  submitEdit() : void {
    if (this.vehicleDetailsForm.valid) {
      let vehicleDetails = {
        "model": this.vehicleDetailsForm.controls['model'].value,
        "vehicleType": this.vehicleDetailsForm.controls['vehicleType'].value,
        "licenseNumber": this.vehicleDetailsForm.controls['licenseNumber'].value,
        "babyTransport": this.vehicleDetailsForm.controls['babyTransport'].value,
        "petTransport": this.vehicleDetailsForm.controls['petTransport'].value,
        "passengerSeats": this.vehicleDetailsForm.controls['passengerSeats'].value,
        "currentLocation": {
          "address": "Null Island",
          "longitude": 0,
          "latitude": 0
        }
      }
      this._vehicleService.makeVehicleChangeRequest(this.userId, vehicleDetails).pipe(take(1)).subscribe({
        next: (response) => {
          this.responseMessage = response.message;
        },
        error: (error) => {
          if (error instanceof HttpErrorResponse) {

          }
        }
      });
      this.loadVehicleData();
      this.vehicleDetailsForm.disable();
      this.editEnabled = false;
    }
    else{

    }
  }
}
