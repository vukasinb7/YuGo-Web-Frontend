import {Component, EventEmitter, Output} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {MapService} from "../../../home/services/map.service";

@Component({
  selector: 'app-ride-pick-destination',
  templateUrl: './ride-pick-destination.component.html',
  styleUrls: ['./ride-pick-destination.component.css']
})
export class RidePickDestinationComponent {
  @Output() changeFormPageEmitter = new EventEmitter<number>();
  recommendedAddresses:any[] = [];
  selectedFromAddress:any;
  selectedToAddress:any;
  selectedField?:string;

  destinationForm = new FormGroup({
    from: new FormControl('', [Validators.required]),
    to: new FormControl('', [Validators.required]),
  })
  constructor(private mapService: MapService) {}
  nextFormPage(): void {
    this.changeFormPageEmitter.emit(1);
  }

  onCurrentLocationChange(searchValue: string): void {
    this.recommendedAddresses = [];
    this.mapService.search(searchValue).subscribe({
      next: (result) => {
        for (let address of result.splice(5)){
          this.recommendedAddresses.push(address);
        }
      },
      error: () => {
      }
    });
  }
  onAddressSelected(address:any){
    if(this.selectedField == "from"){
      this.selectedFromAddress = address;
      this.destinationForm.value.from = address.display_name
    }else if(this.selectedField == "to"){
      this.selectedToAddress = address;
      this.destinationForm.value.to = address.display_name;
    }
    this.recommendedAddresses = [];
  }
  changeFieldFocus(fieldName:string){
    this.selectedField=fieldName;
    this.recommendedAddresses = [];
  }
}
