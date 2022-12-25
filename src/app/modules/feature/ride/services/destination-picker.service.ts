import { Injectable } from '@angular/core';
import {Observable, Subject} from "rxjs";
import {Address} from "../model/Address";

@Injectable({
  providedIn: 'root'
})
export class DestinationPickerService {
  private fromAddressPublisher:Subject<Address> = new Subject<Address>();
  private toAddressPublisher:Subject<Address> = new Subject<Address>();
  private toAddress?:Address;
  private fromAddress?:Address;
  enableManualFromAddressSelection:Subject<void> = new Subject<void>();
  enableManualToAddressSelection:Subject<void> = new Subject<void>();
  manuallySelectedFromAddress:Subject<Address> = new Subject<Address>();
  manuallySelectedToAddress:Subject<Address> = new Subject<Address>();
  currentFromAddress:Observable<Address> = this.fromAddressPublisher.asObservable();
  currentToAddress:Observable<Address> = this.toAddressPublisher.asObservable();

  constructor() { }

  updateFromAddress(address:Address){
    if(address){
      this.fromAddress = address;
      this.fromAddressPublisher.next(address);
    }
  }
  updateToAddress(address:Address){
    if(address){
      this.toAddress = address;
      this.toAddressPublisher.next(address);
    }
  }

}
