import {UserSimpleInfo} from "../../../shared/models/UserSimpleInfo";
import {Path} from "../../../shared/models/Path";

export interface RideBooking{
  locations:Path[];
  passengers:UserSimpleInfo[];
  vehicleType:string;
  babyTransport:boolean;
  petTransport:boolean;
  scheduledTime:string;
}
