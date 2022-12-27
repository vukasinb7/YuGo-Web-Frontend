import {AfterViewInit, Component} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {UserService} from "../../../../shared/services/user.service";
import {AuthService} from "../../../../core/services/auth.service";

@Component({
  selector: 'app-vehicle-details',
  templateUrl: './vehicle-details.component.html',
  styleUrls: ['./vehicle-details.component.css']
})
export class VehicleDetailsComponent implements AfterViewInit{
  vehicleDetailsForm : FormGroup;
  editEnabled: boolean = false;
  constructor(private userService: UserService, private authService: AuthService) {
    this.vehicleDetailsForm = new FormGroup({
      model: new FormControl('', [Validators.required]),
      type: new FormControl('', [Validators.required]),
      licence: new FormControl('', [Validators.required]),
      babies: new FormControl('', [Validators.required]),
      pets: new FormControl('', [Validators.required]),
      seats: new FormControl('', [Validators.required]),
    });
  }

  ngAfterViewInit() {
    this.cancelEdit();
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
