import { Injectable } from '@angular/core';
import {Observable, Subject} from "rxjs";
import {Address} from "../model/Address";
import {Control} from "leaflet";

@Injectable({
  providedIn: 'root'
})
export class DestinationPickerService {
  private fromAddressPublisher:Subject<Address | undefined> = new Subject<Address | undefined>();
  private toAddressPublisher:Subject<Address | undefined> = new Subject<Address | undefined>();
  private toAddress?:Address;
  private fromAddress?:Address;
  path:Subject<any> = new Subject<any>();
  enableManualFromAddressSelection:Subject<void> = new Subject<void>();
  enableManualToAddressSelection:Subject<void> = new Subject<void>();
  manuallySelectedFromAddress:Subject<Address> = new Subject<Address>();
  manuallySelectedToAddress:Subject<Address> = new Subject<Address>();
  currentFromAddress:Observable<Address | undefined> = this.fromAddressPublisher.asObservable();
  currentToAddress:Observable<Address | undefined> = this.toAddressPublisher.asObservable();

  constructor() { }

  updateFromAddress(address?:Address){
    this.fromAddress = address;
    this.fromAddressPublisher.next(address);
  }
  updateToAddress(address?:Address){
    this.toAddress = address;
    this.toAddressPublisher.next(address);
  }

}
