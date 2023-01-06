import {UserInfo} from "../../../shared/models/UserInfo";
import {Vehicle} from "../../../shared/models/Vehicle";

export interface VehicleChangeRequest {
  driver: UserInfo;
  oldVehicle: Vehicle;
  newVehicle: Vehicle;
}
