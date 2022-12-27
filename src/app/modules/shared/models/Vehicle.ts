import {LocationInfo} from "./LocationInfo";

export interface Vehicle {
  id: number;
  driverId: number;
  vehicleType: string,
  model: string,
  licenseNumber : string,
  currentLocation: LocationInfo
  passengerSeats: number,
  babyTransport: boolean,
  petTransport: boolean,
}
