import {AfterViewInit, Component, Input, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {UserService} from "../../../../shared/services/user.service";
import {AuthService} from "../../../../core/services/auth.service";
import {Vehicle} from "../../../../shared/models/Vehicle";
import {VehicleService} from "../../services/vehicle.service";
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
  constructor(private _vehicleService: VehicleService) {
    this.vehicleDetailsForm = new FormGroup({
      model: new FormControl('', [Validators.required]),
      type: new FormControl('', [Validators.required]),
      licenseNumber: new FormControl('', [Validators.required]),
      babies: new FormControl('', [Validators.required]),
      pets: new FormControl('', [Validators.required]),
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
          type: vehicle.vehicleType,
          licenseNumber: vehicle.licenseNumber,
          babies: vehicle.babyTransport,
          pets: vehicle.petTransport,
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

      this.vehicleDetailsForm.disable();
      this.editEnabled = false;
    }
    else{

    }
  }
}
