import {AfterViewInit, Component, EventEmitter, Output} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {MapService} from "../../../home/services/map.service";
import * as events from "events";
import {DestinationPickerService} from "../../services/destination-picker.service";
import {Address} from "../../model/Address";

@Component({
  selector: 'app-ride-pick-destination',
  templateUrl: './ride-pick-destination.component.html',
  styleUrls: ['./ride-pick-destination.component.css']
})
export class RidePickDestinationComponent implements AfterViewInit{
  @Output() changeFormPageEmitter = new EventEmitter<number>();
  recommendedAddresses:any[] = [];
  selectedFromAddress?:Address;
  selectedToAddress?:Address;
  selectedField?:string;

  destinationForm = new FormGroup({
    from: new FormControl('', [Validators.required]),
    to: new FormControl('', [Validators.required]),
  })
  constructor(private mapService: MapService, private destinationPickerService: DestinationPickerService) {}

  ngAfterViewInit(): void {
        this.destinationPickerService.manuallySelectedToAddress.subscribe({
          next:(address: Address)=>{
            this.selectedToAddress = address;
            this.destinationForm.value.to = address.name;
          }
        });
    this.destinationPickerService.manuallySelectedFromAddress.subscribe({
      next:(address: Address)=>{
        this.selectedFromAddress = address;
        this.destinationForm.value.from = address.name;
      }
    });
    }
  nextFormPage(): void {
    this.changeFormPageEmitter.emit(1);
  }

  enterSubmit(keyPress: KeyboardEvent):void {
    if(keyPress.code != "Enter"){
      return;
    }
    this.recommendedAddresses = [];
    let searchValue:string = "";
    if(this.selectedField == "from"){
      if(this.destinationForm.controls.from.value){
        searchValue = this.destinationForm.controls.from.value;
      }
    }else if(this.selectedField == "to"){
      if(this.destinationForm.controls.to.value){
        searchValue = this.destinationForm.controls.to.value;
      }
    }
    if(searchValue == ""){
      return;
    }
    this.mapService.search(searchValue).subscribe({
      next: (result) => {
        for (let address of result){
          this.recommendedAddresses.push(address);
        }
      },
      error: () => {
      }
    });

  }

  enableManualFromAddressSelection(){
    this.destinationPickerService.enableManualFromAddressSelection.next();
  }
  enableManualToAddressSelection(){
    this.destinationPickerService.enableManualToAddressSelection.next();
  }

  onAddressSelected(address:any){
    if(this.selectedField == "from"){
      this.selectedFromAddress = address;
      this.destinationPickerService.updateFromAddress ({
        name:address.display_name,
        lat:address.lat,
        long:address.lon
      });
      this.destinationForm.value.from = address.display_name
    }else if(this.selectedField == "to"){
      this.selectedToAddress = address;
      this.destinationPickerService.updateToAddress({
        name:address.display_name,
        lat:address.lat,
        long:address.lon
      });
      this.destinationForm.value.to = address.display_name;
    }
    this.recommendedAddresses = [];
  }
  changeFieldFocus(fieldName:string){
    this.selectedField=fieldName;
    this.recommendedAddresses = [];
  }
}
