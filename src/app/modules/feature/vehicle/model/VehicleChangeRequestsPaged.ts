import {VehicleChangeRequest} from "./VehicleChangeRequest";

export interface VehicleChangeRequestsPaged {
  totalCount : number;
  results: VehicleChangeRequest[];
}
